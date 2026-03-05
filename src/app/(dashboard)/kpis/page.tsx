"use client";

import { mockData, KPI } from "@/lib/mock-data";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Target, TrendingUp, HelpCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function KPIDetailPage() {
    // In a real app we'd use params, mapping all here for demo
    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 hover:bg-[#1E293B] rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-[#94A3B8]" />
                </Link>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Strategic KPI Deep Dive</h2>
            </div>

            {mockData.kpis.map((kpi) => (
                <section key={kpi.id} className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                {kpi.label}
                                <Badge variant="outline" className="text-[10px] bg-[#1E293B] border-[#3B82F6] text-[#3B82F6]">
                                    KPI {kpi.id}
                                </Badge>
                            </h3>
                            <p className="text-sm text-[#94A3B8]">{kpi.definition}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-white">{kpi.current_value}{kpi.unit}</p>
                            <p className="text-xs text-danger font-medium">-{Math.abs(kpi.current_value - kpi.target_value).toFixed(1)}{kpi.unit} from target</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 bg-[#1E293B] border-[#334155]">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold text-[#94A3B8] uppercase">12-Month Progression</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={kpi.trend.map((v, i) => ({ month: `M${i + 1}`, value: v, benchmark: v * 1.2 }))}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis dataKey="month" stroke="#64748B" fontSize={10} />
                                        <YAxis stroke="#64748B" fontSize={10} />
                                        <RechartsTooltip
                                            contentStyle={{ backgroundColor: "#0F172A", border: "1px solid #334155" }}
                                            itemStyle={{ fontSize: "12px" }}
                                        />
                                        <Legend iconType="circle" />
                                        <Line
                                            name="Your Municipality"
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#3B82F6"
                                            strokeWidth={3}
                                            dot={{ fill: "#3B82F6" }}
                                        />
                                        <Line
                                            name="Swedish Average"
                                            type="monotone"
                                            dataKey="benchmark"
                                            stroke="#94A3B8"
                                            strokeDasharray="5 5"
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Card className="bg-[#1E293B] border-[#334155]">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs font-bold text-[#3B82F6] uppercase flex items-center gap-2">
                                        <HelpCircle className="w-4 h-4" /> Why this matters
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-white leading-relaxed">
                                        {kpi.why_it_matters}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-danger/10 border-danger/30">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs font-bold text-danger uppercase flex items-center gap-2">
                                        <Target className="w-4 h-4" /> CDO Priority Actions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <p className="text-xs text-white">1. Review quarterly allocation shift.</p>
                                    <p className="text-xs text-white">2. Audit shadow spend in Social Services.</p>
                                    <p className="text-xs text-white">3. Update legacy KPI definition for 2026.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="h-px bg-[#334155] w-full my-12 opacity-50" />
                </section>
            ))}
        </div>
    );
}
