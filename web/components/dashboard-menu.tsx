"use client";

import { ROUTES } from "@/lib/routes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HistoryIcon, SendIcon, HouseIcon, UserRoundIcon } from "lucide-react";
import type { ReactNode } from "react";

type navItem = {
    display: () => ReactNode;
    route: string;
}
const navigation: navItem[] = [

    {
        display: () => (
            <div className="flex items-center justify-center gap-3">
                <SendIcon /> Initiate
            </div>
        ),
        route: ROUTES.DASHBOARD_INITIATE
    },
    {
        display: () => (
            <div className="flex items-center justify-center gap-3">
                <HouseIcon /> Home
            </div>
        ),
        route: ROUTES.DASHBOARD
    },
    {
        display: () => (
            <div className="flex items-center justify-center gap-3">
                <HistoryIcon /> History
            </div>
        ),
        route: ROUTES.DASHBOARD_HISTORY
    },
    {
        display: () => (
            <div className="flex items-center justify-center gap-3">
                <UserRoundIcon /> Profile
            </div>
        ),
        route: ROUTES.DASHBOARD_PROFILE
    }
]

export default function DashboardMenu() {
    const path = usePathname();
    return (
        <nav className="flex justify-between items-center border-b border-gray-200 p-4 mb-5 flex-wrap">
            {navigation.map((item) => (
                <Link key={item.route} href={item.route} className={path === item.route ? "text-primary transition-all duration-500" : ""}>{item.display()}</Link>
            ))}
        </nav>
    )
}