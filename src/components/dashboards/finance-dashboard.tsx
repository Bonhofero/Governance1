"use client";

import { DollarSign, LineChart, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FinanceDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Finance & Policy Dashboard</h2>
                <p className="text-[#94A3B8]">Total Cost of Ownership, technical debt translation, and cost-saving opportunities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-[#1E293B] border-[#334155]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-[#94A3B8]">Tech Debt Burden</CardTitle>
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">42M SEK</div>
                        <p className="text-xs text-red-500 mt-1">+12% vs last year</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#1E293B] border-[#334155]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-[#94A3B8]">Projected Savings (Decommission)</CardTitle>
                        <DollarSign className="w-4 h-4 text-success" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">8.5M SEK</div>
                        <p className="text-xs text-success mt-1">Identified across 14 redundant systems</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#1E293B] border-[#334155]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-[#94A3B8]">TCO vs Modernization Cost</CardTitle>
                        <LineChart className="w-4 h-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">1.4x</div>
                        <p className="text-xs text-amber-500 mt-1">Status quo is more expensive over 3yr</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-6 h-[400px] flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-white mb-2">Cost Breakdown Table</h3>
                    <p className="text-[#94A3B8]">Detailed TCO table and ROI comparisons will load here.</p>
                </div>
            </div>
        </div>
    );
}
