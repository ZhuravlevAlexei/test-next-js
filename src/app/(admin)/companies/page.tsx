import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getCompanies } from '@/lib/api';
import getQueryClient from '@/lib/utils/getQueryClient';
import CompanyTable from '@/app/components/company-table';

export interface PageProps {}

export default async function Page({}: PageProps) {
  const queryClient = getQueryClient(); // отримання queryClient

  // завантаження компаній з функцією prefetchQuery
  await queryClient.prefetchQuery({
    // ключ
    queryKey: ['companies'],
    //ф-ція завантаження даних, cache: 'no-store' без кешування (для дінамічності сторінки)
    queryFn: () => getCompanies({ cache: 'no-store' }),
    staleTime: 10 * 1000, // час свіжості (оновлення), мсек.
  });
  // state із ReactQuery для гідратації даних на клієнті та відновлення їх в кєш
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CompanyTable />
    </HydrationBoundary>
  );
}
