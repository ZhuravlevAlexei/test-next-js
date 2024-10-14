import React from 'react';
import Sidebar from '@/app/components/sidebar';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    // console.log("rendering") // for show quantity rendering while use tag <a> vs <Link> in component <SidebarItem /> from <Sidebar />
  return (
    <>
      <Sidebar />
      <div className="ml-60">{children}</div>
    </>
  );
}
