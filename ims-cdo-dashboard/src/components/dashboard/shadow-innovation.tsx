"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";

interface Anomaly {
    unit: string;
    type: string;
    confidence: number;
    detail: string;
}

interface ShadowInnovationDetectorProps {
    shadowPct: number;
    anomalies: Anomaly[];
}

export function ShadowInnovationDetector({ shadowPct, anomalies }: ShadowInnovationDetectorProps) {
    return (
        <Card className="bg-[#1E293B] border-danger/30 shadow-lg overflow-hidden">
            <div className="bg-danger/10 px-4 py-2 border-b border-danger/20 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-danger transition-pulse animate-pulse" />
                <span className="text-xs font-bold text-danger uppercase tracking-wider">Shadow Innovation Alert</span>
            </div>
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Circular Gauge */}
                    <div className="relative w-32 h-32">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="#0F172A"
                                strokeWidth="8"
                            />
                            <circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="#EF4444"
                                strokeWidth="8"
                                strokeDasharray={`${shadowPct * 2.82} 282`}
                                strokeLinecap="round"
                                className="transition-all duration-1000 rotate-[-90deg] origin-center"
                            />
                            <text
                                x="50" y="55"
                                textAnchor="middle"
                                className="fill-white text-xl font-bold"
                            >
                                {shadowPct}%
                            </text>
                        </svg>
                        <p className="text-[10px] text-[#94A3B8] text-center mt-2 uppercase font-medium">Est. IT Shadow Spend</p>
                    </div>

                    <div className="flex-1 space-y-4">
                        <h4 className="text-sm font-semibold text-white">Critical Anomalies Detected</h4>
                        <div className="flex flex-wrap gap-2">
                            {anomalies.map((anomaly, idx) => (
                                <Sheet key={idx}>
                                    <SheetTrigger asChild>
                                        <button className="flex items-center gap-2 bg-[#0F172A] hover:bg-[#334155] border border-[#334155] rounded-full px-3 py-1.5 transition-colors text-left">
                                            <div className="w-2 h-2 rounded-full bg-danger animate-ping" />
                                            <span className="text-xs font-medium text-white">{anomaly.unit}</span>
                                            <Badge variant="outline" className="text-[10px] border-[#334155] text-[#94A3B8]">
                                                Conf: {anomaly.confidence}%
                                            </Badge>
                                        </button>
                                    </SheetTrigger>
                                    <SheetContent className="bg-[#0F172A] border-[#334155] text-white">
                                        <SheetHeader>
                                            <SheetTitle className="text-white">Anomaly Details: {anomaly.unit}</SheetTitle>
                                            <SheetDescription className="text-[#94A3B8]">
                                                Shadow Innovation Signal Analysis
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="mt-6 space-y-6">
                                            <div className="bg-[#1E293B] p-4 rounded-lg border border-danger/30">
                                                <p className="text-xs uppercase text-danger font-bold mb-1">Detected Issue</p>
                                                <p className="text-sm text-white font-medium">{anomaly.type}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase text-[#94A3B8] font-bold mb-2">Technical Detail</p>
                                                <p className="text-sm text-white leading-relaxed">
                                                    {anomaly.detail}
                                                </p>
                                            </div>
                                            <div className="pt-4 border-t border-[#334155]">
                                                <p className="text-xs text-[#94A3B8] mb-4">Recommended CDO Action</p>
                                                <div className="space-y-2">
                                                    <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 rounded text-sm font-medium transition-colors">
                                                        Request Governance Audit
                                                    </button>
                                                    <button className="w-full bg-transparent hover:bg-[#1E293B] border border-[#334155] text-[#94A3B8] py-2 rounded text-sm font-medium transition-colors">
                                                        Ignore (Dismiss for 30 days)
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
