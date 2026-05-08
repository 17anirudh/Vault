"use client";

import { ROUTES } from "@/lib/routes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HistoryIcon, SendIcon, HouseIcon, UserRoundIcon } from "lucide-react";
import type { ReactNode } from "react";

type navItem = {
    display: () => ReactNode;
    route: string;
    text: string;
}
const navigation: navItem[] = [

    {
        display: () => (
            <div className="flex items-center justify-center gap-3">
                <SendIcon /> <span className="hidden md:block">Initiate</span>
            </div>
        ),
        route: ROUTES.DASHBOARD_INITIATE,
        text: "Initiate"
    },
    {
        display: () => (
            <div className="flex items-center justify-center gap-3">
                <HouseIcon /> <span className="hidden md:block">Home</span>
            </div>
        ),
        route: ROUTES.DASHBOARD,
        text: "Home"
    },
    {
        display: () => (
            <div className="flex items-center justify-center gap-3">
                <HistoryIcon /> <span className="hidden md:block">History</span>
            </div>
        ),
        route: ROUTES.DASHBOARD_HISTORY,
        text: "History"
    },
    {
        display: () => (
            <div className="flex items-center justify-center gap-3">
                <UserRoundIcon /> <span className="hidden md:block">Profile</span>
            </div>
        ),
        route: ROUTES.DASHBOARD_PROFILE,
        text: "Profile"
    }
]

export default function DashboardMenu() {
    const path = usePathname();
    return (
        <nav className="flex justify-between items-center md:border-b border-t border-gray-200 p-4 mb-5 flex-wrap">
            {navigation.map((item) => (
                <Link 
                    key={item.route} 
                    href={item.route} 
                    className={path === item.route ? "text-primary transition-all duration-500" : ""}
                    title={item.text}
                >
                    {item.display()}
                </Link>
            ))}
        </nav>
    )
}