"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BrainCircuit } from "lucide-react"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <BrainCircuit className="h-6 w-6 text-primary" />
        <span className="font-bold font-headline text-lg">ClarityBoard</span>
      </div>
      <div className="ml-auto">
        <Avatar>
          <AvatarImage src="https://placehold.co/40x40.png" alt="User" />
          <AvatarFallback>CB</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
