import React from 'react';
import { getCategories, getCompanies } from '@/lib/api';
import getCountById from '@/lib/utils/getCountById';
import StatCard, { StatCardType } from '@/app/components/stat-card';
import DashboardCard from '@/app/components/dashboard-card';

export interface PageProps {}

export default async function Page({}: PageProps) {
  // виклики до endpoints
  const categories = await getCategories();
  const companies = await getCompanies();

  // usage utils function for mapping quantity companies for each category
  const counts = getCountById(companies, 'categoryId');

  return (
    // <div>nothing</div>
    <DashboardCard label="Categories of companies">
      <div className="grid grid-cols-12 gap-3 pb-5 px-5">
        {categories.map(({ id, title }) => (
          <div key={id} className="col-span-3">
            <StatCard
              type={StatCardType.Dark}
              label={title}
              counter={counts[id] || 0}
            />
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
