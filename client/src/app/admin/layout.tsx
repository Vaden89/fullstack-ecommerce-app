import { AppSideBar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PageProvider } from "@/contexts/admin-page-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <PageProvider>{children}</PageProvider>
    </SidebarProvider>
  );
}
