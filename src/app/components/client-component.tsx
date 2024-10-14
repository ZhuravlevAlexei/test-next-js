'use client'; //мітка client component

import React from 'react';
import ServerComponentCopy from "@/app/components/server-component-copy";

export interface ClientComponentProps {
  children?: React.ReactNode;
}

export default function ClientComponent({ children }: ClientComponentProps) {
  console.log('Client Component');
  return (
    <div>
      <span>Client Component</span>
      {/*<ServerComponentCopy /> // error - client component не може рендерити server component*/}
      {children}
    </div>
  );
}
