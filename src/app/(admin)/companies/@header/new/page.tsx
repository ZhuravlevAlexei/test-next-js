import React from 'react';
import Header from '@/app/components/header';

export interface PageProps {}

// header для створення нової компанії
export default function Page({}: PageProps) {
  return <Header>Add new company</Header>;
}
