"use client";

import { ShieldAlert, Activity, ServerCrash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OperationsDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Operations Dashboard</h2>
                <p className="text-[#94A3B8]">Risk heatmap, End-of-Life alerts, and single points of failure tracking.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-[#1E293B] border-[#334155]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-[#94A3B8]">Critical Systems Risk</CardTitle>
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">4 Systems</div>
                        <p className="text-xs text-red-500 mt-1">High severity vulnerabilities detected</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#1E293B] border-[#334155]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-[#94A3B8]">End of Life (EOL) Servers</CardTitle>
                        <ServerCrash className="w-4 h-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">12 Servers</div>
                        <p className="text-xs text-amber-500 mt-1">Requires immediate migration</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#1E293B] border-[#334155]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-[#94A3B8]">Overall Uptime Hub</CardTitle>
                        <Activity className="w-4 h-4 text-success" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">99.98%</div>
                        <p className="text-xs text-success mt-1">Within standard deviations</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-6 h-[400px] flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-white mb-2">Systems Risk Heatmap</h3>
                    <p className="text-[#94A3B8]">Interactive graph component mapping dependencies will load here.</p>
                </div>
            </div>
        </div>
    );
}
