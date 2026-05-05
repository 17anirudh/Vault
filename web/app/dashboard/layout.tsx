import DashboardMenu from "@/components/dashboard-menu";
import type { ReactNode } from "react";

type ParentProps = { children: ReactNode }

export default function DashboardLayout({ children }: ParentProps) {
    return (
        <>
            <DashboardMenu />
            {children}
        </>
    )
}