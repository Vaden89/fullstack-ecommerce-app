import { AppSideBar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PageProvider } from "@/contexts/admin-page-provider";
import { auth } from "../(auth)/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session?.user;

  return (
    <SidebarProvider>
      <AppSideBar />
      <PageProvider user={user}>{children}</PageProvider>
    </SidebarProvider>
  );
}
