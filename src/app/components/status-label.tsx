import React from 'react';
import clsx from 'clsx';

import { CompanyStatus } from '@/lib/api';

export interface StatusLabelProps {
  status: CompanyStatus;
  disabled?: boolean; // add state props
  styled?: boolean; // add style props
}

const labelByStatus = {
  [CompanyStatus.Active]: 'Active',
  [CompanyStatus.NotActive]: 'Not Active',
  [CompanyStatus.Pending]: 'Pending',
  [CompanyStatus.Suspended]: 'Suspended',
};

export default function StatusLabel({
  status,
  disabled,
  styled = true,
}: StatusLabelProps) {
  const label = labelByStatus[status];
  if (!styled) return <>{label}</>;

  // console.log('SECRET_KEY', process.env.CRM_SECRET_KEY);
  return (
    <div
      // conditional styles -умовні стилі, застосовано взалежності від status
      className={clsx(
        'inline-flex items-center py-1 px-3.5 rounded-3xl text-sm font-medium',
        status === CompanyStatus.Active && 'text-green-700 bg-green-100',
        status === CompanyStatus.NotActive && 'text-red-700 bg-red-100',
        status === CompanyStatus.Pending && 'text-orange-700 bg-orange-100',
        status === CompanyStatus.Suspended && 'text-blue-700 bg-blue-100',
        {
          ['opacity-75 cursor-not-allowed']: disabled,
        },
      )}
    >
      <div className="w-1 h-1 mr-2 rounded-full bg-current" />
      {label}
    </div>
  );
}
