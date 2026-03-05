"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";

interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    const { user, logout } = useAuth();

    return (
        <header className="fixed top-0 right-0 left-[240px] h-16 bg-[#1E293B] border-b border-[#334155] z-40 flex items-center justify-between px-8">
            <h1 className="text-xl font-semibold text-white">{title}</h1>
            <div className="flex items-center gap-6">
                <Badge variant="outline" className="bg-[#0F172A] text-success border-success px-3 py-1 font-medium">
                    Governance Health: Normal
                </Badge>
                {user && (
                    <div className="flex items-center gap-4 border-l border-[#334155] pl-6">
                        <div className="text-right">
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-[#94A3B8]">{user.title} · Eskilstuna</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-bold cursor-pointer">
                            {user.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <button
                            onClick={logout}
                            className="text-xs text-red-400 hover:text-red-300 ml-2"
                        >
                            Log out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
