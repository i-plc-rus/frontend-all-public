import type { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '../Sidebar/Sidebar';

type LayoutProps = {
  sidebarSlot?: ReactNode;
  headerSlot?: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ sidebarSlot, headerSlot }) => {
  return (
    <SidebarProvider>
      {sidebarSlot}
      <main className="min-h-screen w-full">
        {headerSlot}
        <div className="mx-auto max-w-[1120px] p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
