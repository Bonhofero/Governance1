"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, BarChart2, ShieldAlert, Settings, Info, Database } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Portfolio", href: "/portfolio", icon: Briefcase },
    { name: "KPIs", href: "/kpis", icon: BarChart2 },
    { name: "Infrastructure", href: "/infrastructure", icon: ShieldAlert },
    { name: "Alerts", href: "/alerts", icon: Info },
    { name: "Data Explorer", href: "/data-explorer", icon: Database },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="fixed left-0 top-0 h-full w-[240px] bg-[#0F172A] border-r border-[#334155] z-50 flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-[#334155]">
                <span className="text-2xl font-bold text-white tracking-tighter">IMS</span>
            </div>
            <nav className="flex-1 py-6 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                                isActive
                                    ? "bg-[#3B82F6] text-white"
                                    : "text-[#94A3B8] hover:text-white hover:bg-[#1E293B]"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-[#334155]">
                <button className="flex items-center gap-3 px-3 py-2 w-full text-[#94A3B8] hover:text-white transition-colors">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </button>
            </div>
        </div>
    );
}
