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
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const tasks = [
  { title: "Dagens overblik", url: "/opgave-1" },
  { title: "7-dages vejrudsigt", url: "/opgave-2" },
  { title: "Bedste pendlermetode", url: "/opgave-3" },
  { title: "Dashboard", url: "/opgave-4" },
  { title: "Luftkvalitet", url: "/opgave-5" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <ThemeToggle />
        {session ? (
          <div className="flex flex-col gap-2">
            <p className="px-2 text-sm text-muted-foreground">{session.user.name}</p>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Log ud
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/login" />}>
            Log ind
          </Button>
        )}
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