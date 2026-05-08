import DashboardMenu from "@/components/dashboard-menu";
import type { ReactNode } from "react";

type ParentProps = { children: ReactNode }

export default function DashboardLayout({ children }: ParentProps) {
    return (
        <div className="flex flex-col-reverse md:flex-col h-screen w-screen overflow-x-hidden">
            <DashboardMenu />
            <div className="flex-1 w-full h-full overflow-y-auto p-3">
                {children}
            </div>
        </div>
    )
}