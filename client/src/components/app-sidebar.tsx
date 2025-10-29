import { AdminMenu } from "@/data/menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { LucideIcon } from "lucide-react";

export const AppSideBar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex justify-center border-b">
        <span className="text-center font-semibold text-xl">
          Shopco Admin Panel
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            {AdminMenu.map((item) => {
              const Icon = item.icon as LucideIcon;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <Icon className="!size-4" />
                      <span className="text-base font-medium">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
