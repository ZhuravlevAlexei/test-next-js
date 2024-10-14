import React from 'react';
import Header from '@/app/components/header';

export interface PageProps {}

export default function Page({}: PageProps) {
  return (
    <>
      <Header>Dashboard / New companies</Header>
      <div>New companies additional info </div>
    </>
  );
}
