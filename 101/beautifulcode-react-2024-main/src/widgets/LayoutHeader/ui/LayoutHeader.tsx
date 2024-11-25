import { ShowBudget } from '@/features/showBudget';
import { Separator, SidebarTrigger } from '@/shared/ui';

export const LayoutHeader = () => {
  return (
    <div className="border-b bg-sidebar">
      <div className="mx-auto flex max-w-[1120px] gap-2 px-4 py-2">
        <SidebarTrigger />

        <Separator orientation="vertical" className="h-auto" />

        <ShowBudget />
      </div>
    </div>
  );
};
