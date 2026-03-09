'use client';

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    BarChart,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
    ScatterChart,
    Scatter,
    ZAxis,
    Cell
} from 'recharts';
import {
    ShieldCheck,
    Zap,
    Info,
    Filter,
    TrendingUp,
    LayoutGrid,
    AlertTriangle,
    ArrowUpRight
} from 'lucide-react';

// --- Mock Data ---

const trendData = [
    { year: '2023', maintenance: 290, development: 90 },
    { year: '2024', maintenance: 280, development: 100 },
    { year: '2025', maintenance: 270, development: 110 },
    { year: '2026', maintenance: 260, development: 120 },
];

const matrixData = [
    { admin: 'Social services', m1: 90, m2: 35, context: 'High legacy load, explicit innovation fund for care.' },
    { admin: 'Education', m1: 70, m2: 25, context: 'Devices, learning platforms, digital pedagogy.' },
    { admin: 'Technical/City planning', m1: 45, m2: 20, context: 'IoT, traffic, heavy infra maintenance.' },
    { admin: 'Central admin', m1: 30, m2: 15, context: 'ERP, e-invoicing, automation pilots.' },
    { admin: 'Municipal companies', m1: 25, m2: 25, context: 'Energy, housing; strong open source reuse.' },
];

const innovationData = [
    { name: 'AI Assistants', x: 80, y: 70, budget: 15 },
    { name: 'Open ePlatform', x: 90, y: 40, budget: 20 },
    { name: 'IoT Sensors', x: 60, y: 85, budget: 12 },
    { name: 'Automation Pilots', x: 70, y: 30, budget: 10 },
    { name: 'Digital Twin', x: 85, y: 90, budget: 25 },
    { name: 'Legacy Refactoring', x: 20, y: 15, budget: 8 },
];

// --- Components ---

const Header = () => (
    <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 py-4 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Budget by Track (2026)</h1>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Separating 'Keep the Lights On' from 'Change the Business' in the digital portfolio.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <div className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-white rounded-md shadow-sm border border-slate-200 cursor-default">2026</div>
                    <div className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer transition-colors">2025</div>
                    <div className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer transition-colors">2024</div>
                </div>
                <div className="h-9 px-4 flex items-center bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                    All Administrations
                </div>
                <div className="p-2 bg-slate-100 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors">
                    <Filter className="w-4 h-4 text-slate-600" />
                </div>
            </div>
        </div>
    </div>
);

const TrackPillars = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Track 1: Maintenance */}
        <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
            <div className="h-2 bg-slate-400" />
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-1">
                    <Badge variant="outline" className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Track 1</Badge>
                    <ShieldCheck className="w-5 h-5 text-slate-400" />
                </div>
                <CardTitle className="text-xl text-slate-800">Drift & Förvaltning</CardTitle>
                <CardDescription>Keep the Lights On (Stability & Security)</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-slate-900">260 MSEK</span>
                    <span className="text-slate-500 font-medium">68% of Portfolio</span>
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs mb-1 font-medium">
                            <span className="text-slate-600 uppercase">Realized YTD</span>
                            <span className="text-slate-900">52%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-400 rounded-full" style={{ width: '52%' }} />
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Protected for stability, security, and compliance. Cannot be used to finance development.
                    </p>
                </div>
            </CardContent>
            <CardFooter className="bg-slate-50/50 border-t border-slate-100 py-3">
                <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-slate-400 mt-0.5" />
                    <span className="text-[11px] text-slate-500 font-medium leading-tight">
                        Governance: IT/operations steering group (Uptime, Incidents, Security).
                    </span>
                </div>
            </CardFooter>
        </Card>

        {/* Track 2: Development & Innovation */}
        <Card className="border-indigo-100 shadow-sm overflow-hidden bg-white">
            <div className="h-2 bg-indigo-500" />
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-1">
                    <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50 font-semibold uppercase tracking-wider text-[10px]">Track 2</Badge>
                    <Zap className="w-5 h-5 text-indigo-500" />
                </div>
                <CardTitle className="text-xl text-slate-800">Utveckling & Innovation</CardTitle>
                <CardDescription>Change the Business (External Value)</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-slate-900">120 MSEK</span>
                    <span className="text-indigo-600 font-medium">32% of Portfolio</span>
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs mb-1 font-medium">
                            <span className="text-indigo-600 uppercase">Realized YTD</span>
                            <span className="text-slate-900">38%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-indigo-50">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '38%' }} />
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Protected for change and external value. Cannot be auto-raided by maintenance.
                    </p>
                </div>
            </CardContent>
            <CardFooter className="bg-indigo-50/30 border-t border-indigo-50 py-3">
                <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-indigo-400 mt-0.5" />
                    <span className="text-[11px] text-indigo-600 font-medium leading-tight">
                        Governance: Digitalization board (Citizen outcomes, Automation rate).
                    </span>
                </div>
            </CardFooter>
        </Card>
    </div>
);

const TrendChart = () => (
    <Card className="mb-6 shadow-sm border-slate-200 bg-white">
        <CardHeader>
            <CardTitle className="text-lg">Budget Trend</CardTitle>
            <CardDescription>Budget distribution over time (MSEK)</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Legend verticalAlign="top" align="right" height={36} />
                        <Line
                            name="Maintenance (Track 1)"
                            type="monotone"
                            dataKey="maintenance"
                            stroke="#94a3b8"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#94a3b8' }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            name="Innovation (Track 2)"
                            type="monotone"
                            dataKey="development"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#6366f1' }}
                            activeDot={{ r: 6 }}
                        />
                        <ReferenceLine y={150} stroke="#cbd5e1" strokeDasharray="5 5" label={{ position: 'right', value: 'Target shift: 60/40 by 2028', fill: '#94a3b8', fontSize: 10 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
);

const AllocationMatrix = () => (
    <Card className="mb-6 shadow-sm border-slate-200 bg-white">
        <CardHeader>
            <CardTitle className="text-lg">Admin x Track Matrix</CardTitle>
            <CardDescription>Budget distribution by municipal administration</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-200">
                        <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Administration</TableHead>
                        <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider text-right">Track 1 (Maint)</TableHead>
                        <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider text-right">Track 2 (Inno)</TableHead>
                        <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Context</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {matrixData.map((row) => {
                        const total = row.m1 + row.m2;
                        const p1 = (row.m1 / total) * 100;
                        const p2 = (row.m2 / total) * 100;

                        return (
                            <TableRow key={row.admin} className="border-slate-100">
                                <TableCell className="font-semibold text-slate-700">{row.admin}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="font-bold text-slate-900">{row.m1} MSEK</span>
                                        <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-slate-400" style={{ width: `${p1}%` }} />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="font-bold text-indigo-600">{row.m2} MSEK</span>
                                        <div className="h-1 w-20 bg-indigo-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500" style={{ width: `${p2}%` }} />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs text-slate-500 max-w-[250px] leading-relaxed">
                                    {row.context}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const InnovationQuadrant = () => (
    <Card className="mb-6 shadow-sm border-slate-200 bg-white">
        <CardHeader>
            <CardTitle className="text-lg">Innovation Lens (Track 2 Only)</CardTitle>
            <CardDescription>Mapping initiatives by value and risk</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-[400px] w-full mt-4 relative">
                {/* Quadrant Labels */}
                <div className="absolute top-0 right-0 text-[10px] font-bold text-slate-400 uppercase p-2 border border-slate-100 rounded m-2">Strategic Bets</div>
                <div className="absolute top-0 left-0 text-[10px] font-bold text-slate-400 uppercase p-2 border border-slate-100 rounded m-2">Internal R&D</div>
                <div className="absolute bottom-10 right-0 text-[10px] font-bold text-slate-400 uppercase p-2 border border-slate-100 rounded m-2">Citizen Value</div>
                <div className="absolute bottom-10 left-0 text-[10px] font-bold text-slate-400 uppercase p-2 border border-slate-100 rounded m-2">Hygiene</div>

                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis
                            type="number"
                            dataKey="x"
                            name="Citizen Value"
                            unit="%"
                            domain={[0, 100]}
                            label={{ value: 'Internal Efficiency → External Citizen Value', position: 'bottom', offset: 0, fontSize: 10, fill: '#64748b' }}
                            axisLine={false}
                            tick={false}
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            name="Innovation Level"
                            unit="%"
                            domain={[0, 100]}
                            label={{ value: 'Low-Risk Incremental → High-Risk Innovative', angle: -90, position: 'left', fontSize: 10, fill: '#64748b' }}
                            axisLine={false}
                            tick={false}
                        />
                        <ZAxis type="number" dataKey="budget" range={[100, 1000]} name="Budget" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Initiatives" data={innovationData}>
                            {innovationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={'#6366f1'} fillOpacity={0.8} stroke="#4f46e5" strokeWidth={1} />
                            ))}
                        </Scatter>
                        {/* Custom Background lines for quadrants */}
                        <ReferenceLine x={50} stroke="#e2e8f0" strokeWidth={2} />
                        <ReferenceLine y={50} stroke="#e2e8f0" strokeWidth={2} />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
                {innovationData.map((item) => (
                    <Badge key={item.name} variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100 flex gap-1 items-center px-2 py-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {item.name}
                    </Badge>
                ))}
            </div>
        </CardContent>
    </Card>
);

const GovernanceFooter = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
        <Card className="bg-slate-50 border-none shadow-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                    <LayoutGrid className="w-4 h-4 text-slate-500" />
                    Why separate tracks?
                </CardTitle>
            </CardHeader>
            <CardContent className="text-[13px] text-slate-500 leading-relaxed">
                Mixed IT budgets naturally drift toward 90%+ maintenance over time, effectively killing innovation capacity. Isolation protects the ability to change.
            </CardContent>
        </Card>
        <Card className="bg-slate-50 border-none shadow-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                    <AlertTriangle className="w-4 h-4 text-slate-500" />
                    Shadow innovation risk
                </CardTitle>
            </CardHeader>
            <CardContent className="text-[13px] text-slate-500 leading-relaxed">
                If development cannot be funded openly, employees are forced to disguise it as maintenance, leading to technical debt and lack of strategic alignment.
            </CardContent>
        </Card>
        <Card className="bg-slate-50 border-none shadow-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                    <TrendingUp className="w-4 h-4 text-slate-500" />
                    Political lever
                </CardTitle>
            </CardHeader>
            <CardContent className="text-[13px] text-slate-500 leading-relaxed">
                Only the City Council can change the allocation ratio between tracks. This ensures digitalization is treated as a political priority, not just a line item.
            </CardContent>
        </Card>
    </div>
);

export default function BudgetTrackPage() {
    return (
        <div className="min-h-screen bg-slate-50/30 p-4 md:p-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 p-6 md:p-10">

                {/* Budget Rule Banner */}
                <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <Header />
                </div>

                {/* Top Sections: Pillars */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                    <TrackPillars />
                </div>

                {/* Global Rule Alert */}
                <div className="my-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                    <div className="bg-amber-50 border-amber-200 border-l-4 p-4 rounded-r-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-1">
                            <AlertTriangle className="h-5 w-5 text-amber-600" />
                            <h5 className="text-amber-900 font-bold uppercase tracking-tight text-xs">Core Governance Principle</h5>
                        </div>
                        <p className="text-amber-800 font-medium text-sm">
                            Budget may move within a track, but <span className="underline decoration-amber-300 decoration-2 underline-offset-2">NEVER</span> from Track 2 → Track 1 without explicit political decision.
                            Efficiency gains in Track 1 MUST remain in the digital portfolio.
                        </p>
                    </div>
                </div>

                {/* Charts & Matrix Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
                    <TrendChart />
                    <AllocationMatrix />
                </div>

                {/* Bottom Chart Section */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                    <InnovationQuadrant />
                </div>

                <Separator className="my-12 opacity-50" />

                {/* Footer Guidance */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
                    <GovernanceFooter />

                    <div className="flex justify-center mt-8">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium bg-slate-100/50 px-4 py-2 rounded-full border border-slate-100">
                            <span>IMS Governance Framework © 2026</span>
                            <Separator orientation="vertical" className="h-3 bg-slate-300" />
                            <span>Digitalization Board Authorization Required</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
