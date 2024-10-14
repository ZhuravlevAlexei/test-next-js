import React from 'react';
import { getSummaryStats, SummaryStats } from '@/lib/api';
import StatCard, { StatCardType } from '@/app/components/stat-card';

export interface PageProps {}

const labelByStat = {
  promotions: 'Total promotions',
  categories: 'Total categories',
  newCompanies: 'New companies',
  activeCompanies: 'Total active companies',
};

export default async function Page({}: PageProps) {
  const data = await getSummaryStats({
    // встановлення для next часу кешування ресурсу
    next: {
      revalidate: 5, // revalidate - Значение в сек. определяет, как часто данные извлекаются повторно. Если нужно сделать кеш недействительным вручную, revalidate: 0
    },
  });

  return (
    <div className="grid grid-cols-12 gap-5">
      {(Object.keys(labelByStat) as (keyof SummaryStats)[]).map((key) => (
        <div key={key} className="col-span-3">
          <StatCard
            type={StatCardType.Gradient}
            label={labelByStat[key]}
            counter={data[key]}
          />
        </div>
      ))}
    </div>
  );
}
