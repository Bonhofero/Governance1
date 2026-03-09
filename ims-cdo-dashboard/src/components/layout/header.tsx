import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <header className="fixed top-0 right-0 left-[240px] h-16 bg-[#1E293B] border-b border-[#334155] z-40 flex items-center justify-between px-8">
            <h1 className="text-xl font-semibold text-white">{title}</h1>
            <div className="flex items-center gap-6">
                <Badge variant="outline" className="bg-[#0F172A] text-success border-success px-3 py-1 font-medium">
                    Governance Health: Normal
                </Badge>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm font-medium text-white">Elena Andersson</p>
                        <p className="text-xs text-[#94A3B8]">Chief Digital Officer · Eskilstuna</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-bold">
                        EA
                    </div>
                </div>
            </div>
        </header>
    );
}
