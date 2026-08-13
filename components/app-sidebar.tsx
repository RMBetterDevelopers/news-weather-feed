"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle-loader";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const tasks = [
  { title: "Dagens overblik", url: "/opgave-1" },
  { title: "7-dages vejrudsigt", url: "/opgave-2" },
  { title: "Bedste pendlermetode", url: "/opgave-3" },
  { title: "Opgave 4", url: "/opgave-4" },
  { title: "Opgave 5", url: "/opgave-5" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <ThemeToggle />
        <p></p>
        <span className="px-2 text-lg font-semibold">Opgaver</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tasks.map((task) => (
                <SidebarMenuItem key={task.url}>
                  <SidebarMenuButton
                    isActive={pathname === task.url}
                    render={<Link href={task.url} />}
                  >
                    {task.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}