"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Initiative, InitiativeStage, InitiativeType } from "@/lib/mock-data";
import { User, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface InitiativeKanbanProps {
    initiatives: Initiative[];
}

const stages: { id: InitiativeStage; label: string }[] = [
    { id: "ideation", label: "Ideation" },
    { id: "evaluation", label: "Evaluation" },
    { id: "active", label: "Active" },
    { id: "scaling", label: "Scaling" },
];

const typeStyles: Record<InitiativeType, { label: string; color: string }> = {
    quick_win: { label: "Quick Win", color: "bg-success/20 text-success border-success/30" },
    moonshot: { label: "Moonshot", color: "bg-primary/20 text-primary border-primary/30" },
    enterprise_anchor: { label: "Enterprise Anchor", color: "bg-white/10 text-white border-white/20" },
    venture: { label: "Venture", color: "bg-warning/20 text-warning border-warning/30" },
    kill_zone: { label: "Kill Zone", color: "bg-danger/20 text-danger border-danger/30" },
};

export function InitiativeKanban({ initiatives }: InitiativeKanbanProps) {
    return (
        <Card className="bg-[#1E293B] border-[#334155] shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">Initiative Pipeline</CardTitle>
                <Link href="/portfolio" className="text-xs text-[#3B82F6] hover:underline flex items-center gap-1">
                    View all <ChevronRight className="w-3 h-3" />
                </Link>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {stages.map((stage) => {
                        const filtered = initiatives.filter((i) => i.stage === stage.id).slice(0, 3);
                        return (
                            <div key={stage.id} className="space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <h5 className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">{stage.label}</h5>
                                    <span className="text-[10px] text-[#64748B]">{initiatives.filter(i => i.stage === stage.id).length}</span>
                                </div>
                                <div className="space-y-2">
                                    {filtered.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-[#0F172A] border border-[#334155] rounded-lg p-3 hover:border-[#3B82F6] transition-all group cursor-pointer"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge className={cn("text-[8px] px-1 py-0", typeStyles[item.type].color)}>
                                                    {typeStyles[item.type].label}
                                                </Badge>
                                                <span className="text-[9px] text-[#64748B] flex items-center gap-1">
                                                    <Clock className="w-2.5 h-2.5" /> {item.age_days}d
                                                </span>
                                            </div>
                                            <h6 className="text-[11px] font-bold text-white group-hover:text-[#3B82F6] transition-colors mb-2 line-clamp-1">
                                                {item.name}
                                            </h6>
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full bg-[#1E293B] flex items-center justify-center">
                                                    <User className="w-2.5 h-2.5 text-[#94A3B8]" />
                                                </div>
                                                <span className="text-[9px] text-[#94A3B8]">{item.owner}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {filtered.length === 0 && (
                                        <div className="h-20 border border-dashed border-[#334155] rounded-lg flex items-center justify-center">
                                            <span className="text-[10px] text-[#64748B]">Empty</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
