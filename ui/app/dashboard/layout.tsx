import Menu from "@/components/menu";
import type { ReactNode } from "react";

type DashboardLayoutProps = { children: ReactNode };

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-col h-screen w-full">
      <header className="sticky top-0 left-0 right-0 w-full">
        <Menu />
      </header>
      <main className="flex-1 w-full flex flex-col items-center justify-center gap-4">
        {children}
      </main>
    </div>
  );
}