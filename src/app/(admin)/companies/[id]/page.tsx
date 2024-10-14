import React from 'react';

import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Company, getCompany, getPromotions } from '@/lib/api';
import getQueryClient from '@/lib/utils/getQueryClient';
import CompanyInfo from '@/app/components/company-info';
import CompanyPromotions from '@/app/components/company-promotions';

export interface PageProps {
  params: { id: string }; // додавання ідентифікатора в типи
}

// для динамічного роутингу сторінки компанії, передамо params в Props рендерингу
export default async function Page({ params }: PageProps) {
  const queryClient = getQueryClient();

  // завантаження ресурсу companies
  await queryClient.prefetchQuery({
    queryKey: ['companies', params.id],
    queryFn: () => getCompany(params.id, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  // завантаження ресурсу promotions
  await queryClient.prefetchQuery({
    queryKey: ['promotions', params.id],
    queryFn: () =>
      getPromotions({ companyId: params.id }, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  const company = queryClient.getQueryData(['companies', params.id]) as Company;
  if (!company) {
    notFound(); // виклик ф-ції обробки у разі неможливості завантажити company
  }

  const dehydratedState = dehydrate(queryClient);

  // якщо компанія існує рендеряться клієнтьски компоненти за id із параметрів
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="py-6 px-10 grid grid-cols-12 gap-5">
        <div className="col-span-3">
          <CompanyInfo companyId={params.id} />
        </div>
        <div className="col-span-9">
          <CompanyPromotions companyId={params.id} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
