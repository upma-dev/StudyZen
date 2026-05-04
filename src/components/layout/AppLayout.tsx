"use client";

import type { PropsWithChildren } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ListChecks,
  NotebookText,
  Brain,
  Bot,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { useState } from "react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChatbotDialog } from "@/components/dashboard/ChatbotDialog";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: ListChecks },
  { href: "/notes", label: "Notes", icon: NotebookText },
  { href: "/focus", label: "Focus Mode", icon: Brain },
];

function SidebarCollapseButton() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSidebar();
      }}
      className="
        flex items-center justify-center
        w-7 h-7 rounded-md
        text-gray-400 hover:text-white
        hover:bg-white/10
        transition-all duration-200
        cursor-pointer
        md:hidden
      "
      title="Toggle Sidebar"
      aria-label="Toggle Sidebar"
    >
      {isCollapsed ? (
        <ChevronRight className="w-4 h-4" />
      ) : (
        <ChevronLeft className="w-4 h-4" />
      )}
    </button>
  );
}

export function AppLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const isPublicHome = pathname === "/" && !user;
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Show nothing while loading to prevent flash
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050d1a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If not logged in and not on home page, show minimal layout (user will see empty content)
  if (!user && !isPublicHome) {
    return <div className="min-h-screen bg-[#050d1a]">{children}</div>;
  }

  if (isPublicHome && !user) {
    return <div className="min-h-screen bg-[#050d1a]">{children}</div>;
  }

  return (
    <SidebarProvider>
      
      {/* SIDEBAR */}
      <Sidebar
        collapsible="icon"
        className="w-[240px] min-w-[240px] border-r bg-[#0B1220]"
      >
{/* HEADER */}
        <SidebarHeader className="px-4 py-5 border-b border-white/10">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="flex items-center gap-3 flex-1">
              <Bot className="w-8 h-8 text-blue-500" />
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-lg font-semibold text-white">
                  StudyZen
                </span>
                <span className="text-xs text-gray-400">
                  Learn Smarter
                </span>
              </div>
            </Link>
            
            {/* Collapse Toggle Button */}
            <SidebarCollapseButton />
          </div>
        </SidebarHeader>

        {/* MENU */}
        <SidebarContent className="px-3 py-4">
          <SidebarMenu className="space-y-2">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    className="
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      text-gray-300 hover:text-white
                      hover:bg-blue-600/20
                      data-[active=true]:bg-blue-600
                      data-[active=true]:text-white
                      transition-all
                    "
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

{/* FOOTER */}
        <SidebarFooter className="p-4 mt-auto border-t border-white/10">
          <div className="flex flex-col gap-3">
            <button
              onClick={handleLogout}
              className="
                flex items-center gap-3 px-4 py-3 rounded-xl
                text-gray-300 hover:text-red-400
                hover:bg-red-500/10
                transition-all w-full
              "
              title="Log Out"
            >
              <LogOut className="w-5 h-5" />
              <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
            </button>
            <ThemeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* MAIN CONTENT */}
      <SidebarInset>
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 border-b bg-background/80 backdrop-blur-sm">
          
          <div className="flex items-center gap-3">
            <SidebarTrigger className="md:hidden" />
            <h2 className="text-xl font-semibold">
              {navItems.find(item => item.href === pathname)?.label || "StudyZen"}
            </h2>
          </div>

<div className="flex items-center gap-3">
            {/* Prominent AI Assistant Button */}
            <button
              onClick={() => setChatbotOpen(true)}
              className="
                flex items-center gap-2 px-4 py-2 rounded-xl
                bg-gradient-to-r from-orange-500 to-amber-500
                text-white font-medium
                hover:from-orange-400 hover:to-amber-400
                transition-all shadow-lg shadow-orange-500/20
              "
            >
              <Bot className="w-5 h-5" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>
            <ChatbotDialog open={chatbotOpen} onOpenChange={setChatbotOpen} />
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto bg-[#0F172A] min-h-screen">
          {children}
        </main>
      </SidebarInset>

    </SidebarProvider>
  );
}