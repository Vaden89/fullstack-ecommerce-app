"use client";
import { AppSideBar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
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
