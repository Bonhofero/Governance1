"use client";

import { useState } from "react";
import { mockData, Initiative, InitiativeType, InitiativeStage } from "@/lib/mock-data";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Search, Filter, ArrowUpDown } from "lucide-react";

const typeStyles: Record<InitiativeType, { label: string; color: string }> = {
    quick_win: { label: "Quick Win", color: "bg-success/20 text-success border-success/30" },
    moonshot: { label: "Moonshot", color: "bg-primary/20 text-primary border-primary/30" },
    enterprise_anchor: { label: "Enterprise Anchor", color: "bg-white/10 text-white border-white/20" },
    venture: { label: "Venture", color: "bg-warning/20 text-warning border-warning/30" },
    kill_zone: { label: "Kill Zone", color: "bg-danger/20 text-danger border-danger/30" },
};

export default function PortfolioPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);

    const filteredData = mockData.initiatives.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.owner.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "all" || item.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1E293B] p-4 rounded-xl border border-[#334155]">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                    <Input
                        placeholder="Search initiatives or owners..."
                        className="pl-10 bg-[#0F172A] border-[#334155] text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Filter className="w-4 h-4 text-[#64748B]" />
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[180px] bg-[#0F172A] border-[#334155] text-white">
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1E293B] border-[#334155] text-white">
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="quick_win">Quick Win</SelectItem>
                            <SelectItem value="moonshot">Moonshot</SelectItem>
                            <SelectItem value="enterprise_anchor">Enterprise Anchor</SelectItem>
                            <SelectItem value="venture">Venture</SelectItem>
                            <SelectItem value="kill_zone">Kill Zone</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-[#0F172A]">
                        <TableRow className="hover:bg-transparent border-[#334155]">
                            <TableHead className="text-[#94A3B8] font-bold uppercase text-[10px] tracking-widest">Name</TableHead>
                            <TableHead className="text-[#94A3B8] font-bold uppercase text-[10px] tracking-widest">Type</TableHead>
                            <TableHead className="text-[#94A3B8] font-bold uppercase text-[10px] tracking-widest">Stage</TableHead>
                            <TableHead className="text-[#94A3B8] font-bold uppercase text-[10px] tracking-widest">Owner</TableHead>
                            <TableHead className="text-[#94A3B8] font-bold uppercase text-[10px] tracking-widest text-right">Value</TableHead>
                            <TableHead className="text-[#94A3B8] font-bold uppercase text-[10px] tracking-widest text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((item) => (
                            <TableRow
                                key={item.id}
                                className="border-[#334155] hover:bg-[#334155]/20 cursor-pointer transition-colors"
                                onClick={() => setSelectedInitiative(item)}
                            >
                                <TableCell className="font-semibold text-white py-4">{item.name}</TableCell>
                                <TableCell>
                                    <Badge className={cn("text-[10px] px-2 py-0", typeStyles[item.type].color)}>
                                        {typeStyles[item.type].label}
                                    </Badge>
                                </TableCell>
                                <TableCell className="capitalize text-[#94A3B8] text-sm">{item.stage}</TableCell>
                                <TableCell className="text-[#94A3B8] text-sm">{item.owner}</TableCell>
                                <TableCell className="text-right">
                                    <span className="text-white font-mono">{item.value_score}</span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge variant="outline" className={cn(
                                        "text-[10px]",
                                        item.status === "Critical" ? "text-danger border-danger" :
                                            item.status === "At Risk" ? "text-warning border-warning" : "text-success border-success"
                                    )}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {filteredData.length === 0 && (
                    <div className="py-20 text-center text-[#64748B]">
                        No initiatives found matching your filters.
                    </div>
                )}
            </div>

            <Sheet open={!!selectedInitiative} onOpenChange={(open) => !open && setSelectedInitiative(null)}>
                <SheetContent className="bg-[#0F172A] border-[#334155] text-white sm:max-w-md">
                    {selectedInitiative && (
                        <>
                            <SheetHeader>
                                <div className="mb-2">
                                    <Badge className={cn("text-[10px]", typeStyles[selectedInitiative.type].color)}>
                                        {typeStyles[selectedInitiative.type].label}
                                    </Badge>
                                </div>
                                <SheetTitle className="text-white text-2xl">{selectedInitiative.name}</SheetTitle>
                                <SheetDescription className="text-[#94A3B8]">
                                    Detailed Initiative Profile · ID: {selectedInitiative.id}
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-8 space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#1E293B] p-4 rounded-lg border border-[#334155]">
                                        <p className="text-[10px] uppercase text-[#64748B] font-bold mb-1">Value Score</p>
                                        <p className="text-2xl font-bold text-white">{selectedInitiative.value_score}/100</p>
                                    </div>
                                    <div className="bg-[#1E293B] p-4 rounded-lg border border-[#334155]">
                                        <p className="text-[10px] uppercase text-[#64748B] font-bold mb-1">Feasibility</p>
                                        <p className="text-2xl font-bold text-white">{selectedInitiative.feasibility_score}%</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] uppercase text-[#64748B] font-bold mb-2">Stakeholders</p>
                                        <div className="flex items-center gap-3 bg-[#1E293B] p-3 rounded-lg border border-[#334155]">
                                            <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center font-bold text-xs">
                                                {selectedInitiative.owner.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">{selectedInitiative.owner}</p>
                                                <p className="text-[10px] text-[#64748B]">Primary Owner · IT Dept</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase text-[#64748B] font-bold mb-2">Portfolio Metadata</p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#94A3B8]">Stage:</span>
                                                <span className="text-white capitalize">{selectedInitiative.stage}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#94A3B8]">Active Days:</span>
                                                <span className="text-white">{selectedInitiative.age_days} days</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#94A3B8]">Governance Posture:</span>
                                                <span className="text-success font-medium">Compliance Verified</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-[#334155] space-y-3">
                                    <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 rounded text-sm font-medium transition-colors">
                                        Open Strategic Review
                                    </button>
                                    <button className="w-full bg-transparent hover:bg-[#1E293B] border border-[#334155] text-[#94A3B8] py-2 rounded text-sm font-medium transition-colors">
                                        Download Summary PDF
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
