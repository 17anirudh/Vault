"use client";

import { ROUTES, type RouteItem } from "@/lib/constants";
import Link from "next/link";
import { LandmarkIcon, UserCircleIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const routes: RouteItem[] = [
    {
        label: "Cash",
        route: ROUTES.CASH,
        icon: <LandmarkIcon />
    },
    {
        label: null,
        route: ROUTES.HOME,
        icon: <Image src="/favicon.png" alt="Logo" width={50} height={50} />
    },
    {
        label: "Profile",
        route: ROUTES.PROFILE,
        icon: <UserCircleIcon />
    }
]

export default function Menu() {
    const pathname = usePathname();
    return (
    <nav className="w-full flex flex-wrap justify-between p-5 items-center border-b pl-10 pr-10 bg-foreground z-50">
        {routes.map((item, index) => (
            <Link 
                key={index} 
                href={item.route}
                className="flex flex-col gap-1 items-center justify-center"
            >
                {item.icon}
                {item.label && <span className={pathname === item.route ? "text-blue-500 border-b-2 border-blue-500" : ""}>{item.label}</span>}
            </Link>
        ))}
    </nav>
    );
}