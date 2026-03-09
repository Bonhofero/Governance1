"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AmbidexterityMeterProps {
    efficiency: number;
    innovation: number;
    internal: number;
    external: number;
    targetEfficiency: number;
}

export function AmbidexterityMeter({
    efficiency,
    innovation,
    internal,
    external,
    targetEfficiency
}: AmbidexterityMeterProps) {

    const isTargetMet = Math.abs(efficiency - targetEfficiency) <= 5;
    const statusColor = isTargetMet ? "bg-success" : Math.abs(efficiency - targetEfficiency) <= 15 ? "bg-warning" : "bg-danger";

    return (
        <Card className="bg-[#1E293B] border-[#334155] shadow-xl">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
                        Portfolio Balance — Are we ambidextrous?
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#0F172A] border-[#334155] text-white p-2">
                                    <p className="max-w-xs text-xs">Based on Magnusson et al., (2025). Measures the split between Efficiency (maintenance) and Innovation (transformation).</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardTitle>
                    <span className="text-[10px] text-[#64748B]">Source: Magnusson et al., 2025</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Axis 1: Efficiency vs Innovation */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-white">Efficiency ({efficiency}%)</span>
                        <span className="text-white">Innovation ({innovation}%)</span>
                    </div>
                    <div className="relative h-6 bg-[#0F172A] rounded-full overflow-hidden border border-[#334155]">
                        <div
                            className="absolute left-0 top-0 h-full bg-[#3B82F6] transition-all duration-1000"
                            style={{ width: `${efficiency}%` }}
                        />
                        {/* Target Zone Highlight */}
                        <div
                            className="absolute top-0 h-full bg-white/10 border-x border-white/20"
                            style={{ left: `${targetEfficiency - 5}%`, width: `10%` }}
                        />
                        {/* Movable Indicator Dot */}
                        <div
                            className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-1000", statusColor)}
                            style={{ left: `calc(${efficiency}% - 8px)` }}
                        />
                    </div>
                    <p className="text-[10px] text-[#64748B] text-center italic">Highlighted zone: 60/40 Target</p>
                </div>

                {/* Axis 2: Internal vs External */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-white">Internal-facing ({internal}%)</span>
                        <span className="text-white">Citizen-facing ({external}%)</span>
                    </div>
                    <div className="h-4 bg-[#0F172A] rounded-full overflow-hidden border border-[#334155] flex">
                        <div
                            className="h-full bg-[#94A3B8] transition-all duration-1000"
                            style={{ width: `${internal}%` }}
                        />
                        <div
                            className="h-full bg-[#22C55E] transition-all duration-1000"
                            style={{ width: `${external}%` }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

