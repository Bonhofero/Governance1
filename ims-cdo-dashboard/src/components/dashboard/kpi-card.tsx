"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { KPI } from "@/lib/mock-data";

interface KPICardProps {
    kpi: KPI;
}

export function KPICard({ kpi }: KPICardProps) {
    const isTargetMet = kpi.invert_scale
        ? kpi.current_value <= kpi.target_value
        : kpi.current_value >= kpi.target_value;

    const status = isTargetMet ? "On Track" : (Math.abs(kpi.current_value - kpi.target_value) / kpi.target_value < 0.2 ? "At Risk" : "Critical");

    const statusColors = {
        "On Track": "bg-success hover:bg-success/80",
        "At Risk": "bg-warning hover:bg-warning/80",
        "Critical": "bg-danger hover:bg-danger/80",
    }[status];

    const chartData = kpi.trend.map((val, i) => ({ val }));

    return (
        <Card className="bg-[#1E293B] border-[#334155] hover:border-[#3B82F6] transition-all duration-300 group">
            <CardHeader className="p-4 pb-2 space-y-0">
                <div className="flex items-start justify-between">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CardTitle className="text-xs font-semibold text-[#94A3B8] group-hover:text-white transition-colors cursor-help max-w-[80%] leading-tight uppercase">
                                    {kpi.label}
                                </CardTitle>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#0F172A] border-[#334155] text-white p-3 max-w-xs">
                                <p className="font-bold mb-1">{kpi.label}</p>
                                <p className="text-xs text-[#94A3B8] mb-2">{kpi.definition}</p>
                                <div className="bg-[#1E293B] p-2 rounded text-[10px]">
                                    <p className="text-[#3B82F6] font-bold uppercase mb-1">Why it matters</p>
                                    <p>{kpi.why_it_matters}</p>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Badge className={statusColors}>{status}</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="flex items-end justify-between mt-2">
                    <div>
                        <div className="text-2xl font-bold text-white leading-none">
                            {kpi.current_value}{kpi.unit}
                        </div>
                        <div className="text-[10px] text-[#64748B] mt-1">
                            Target: {kpi.target_value}{kpi.unit}
                        </div>
                    </div>
                    <div className="h-10 w-24">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <Line
                                    type="monotone"
                                    dataKey="val"
                                    stroke={status === "Critical" ? "#EF4444" : "#3B82F6"}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
