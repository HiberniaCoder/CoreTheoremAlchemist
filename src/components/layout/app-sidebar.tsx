"use client"

import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  BarChart3,
  BrainCircuit,
  Settings,
  PlusCircle,
} from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/predictions", label: "AI Prediction", icon: BrainCircuit },
  ]

  const futureMenuItems = [
    { href: "#", label: "Future Module", icon: PlusCircle, disabled: true },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        {/* Can add logo or app name here if needed in sidebar view */}
      </SidebarHeader>
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={{ children: item.label, side: "right" }}
            >
              <a href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarMenu className="mt-auto">
         {futureMenuItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <SidebarMenuButton
              asChild
              disabled
              tooltip={{ children: item.label, side: "right" }}
            >
              <a href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={{ children: "Settings", side: "right" }}
            >
              <a href="#">
                <Settings />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
