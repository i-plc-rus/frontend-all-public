import { Layout } from '@/shared/ui';
import { AppSidebar } from '@/widgets/AppSidebar';
import { LayoutHeader } from '@/widgets/LayoutHeader';

export const layoutWithSidebar = <Layout sidebarSlot={<AppSidebar />} headerSlot={<LayoutHeader />} />;
