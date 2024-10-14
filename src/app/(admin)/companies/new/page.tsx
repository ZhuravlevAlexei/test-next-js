'use client';

import dynamic from 'next/dynamic';
import React from 'react';
// import CompanyForm from '@/app/components/company-form';

// Dynamically import the CompanyForm, client-side only
const CompanyForm = dynamic(() => import('@/app/components/company-form'), {
  ssr: false,
});

export interface PageProps {}

export default function Page({}: PageProps) {
  return (
    <div className="py-6 px-10">
      <CompanyForm onSubmit={console.log} />
    </div>
  );
}
