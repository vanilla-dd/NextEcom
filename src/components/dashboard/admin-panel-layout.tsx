"use client";

import { useSidebarToggle } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { useStore } from "zustand";
import { Sidebar } from "./sidebar";
import { Footer } from "./dashboard-footer";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100dvh-3.25rem)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          "transition-[margin-left] duration-300 ease-in-out",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        {/* <Footer /> */}
      </footer>
    </>
  );
}
