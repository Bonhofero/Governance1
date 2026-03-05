"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { System } from "@/lib/mock-data";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, ReferenceArea } from "recharts";
import { Badge } from "@/components/ui/badge";

interface InfrastructureQuadrantProps {
    systems: System[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-[#0F172A] border border-[#334155] p-3 rounded-lg shadow-2xl">
                <p className="text-xs font-bold text-white mb-2">{data.name}</p>
                <div className="space-y-1.5">
                    <div className="flex justify-between gap-4 text-[10px]">
                        <span className="text-[#94A3B8]">Criticality:</span>
                        <span className="text-white font-medium">{data.criticality}%</span>
                    </div>
                    <div className="flex justify-between gap-4 text-[10px]">
                        <span className="text-[#94A3B8]">Capital Availability:</span>
                        <span className="text-white font-medium">{data.capital_available}%</span>
                    </div>
                    <div className="flex justify-between gap-4 text-[10px]">
                        <span className="text-[#94A3B8]">Strategy:</span>
                        <Badge variant="outline" className="capitalize text-[8px] bg-[#1E293B] border-[#334155] text-[#3B82F6]">
                            {data.strategy}
                        </Badge>
                    </div>
                    <div className="flex justify-between gap-4 text-[10px] pt-1 border-t border-[#334155]">
                        <span className="text-[#94A3B8]">Owner:</span>
                        <span className="text-white">{data.owner}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export function InfrastructureQuadrant({ systems }: InfrastructureQuadrantProps) {
    return (
        <Card className="bg-[#1E293B] border-[#334155] shadow-xl">
            <CardHeader>
                <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">Infrastructure Renewal Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                            <XAxis
                                type="number"
                                dataKey="capital_available"
                                name="Capital"
                                domain={[0, 100]}
                                hide
                            />
                            <YAxis
                                type="number"
                                dataKey="criticality"
                                name="Criticality"
                                domain={[0, 100]}
                                hide
                            />
                            <ZAxis type="number" range={[100, 100]} />

                            {/* Quadrant Visuals */}
                            <ReferenceArea x1={0} x2={50} y1={0} y2={50} fill="#334155" fillOpacity={0.1} label={{ position: 'center', value: 'ACCEPT', fill: '#64748B', fontSize: 10, fontWeight: 'bold' }} />
                            <ReferenceArea x1={50} x2={100} y1={0} y2={50} fill="#334155" fillOpacity={0.2} label={{ position: 'center', value: 'REVAMP', fill: '#64748B', fontSize: 10, fontWeight: 'bold' }} />
                            <ReferenceArea x1={0} x2={50} y1={50} y2={100} fill="#334155" fillOpacity={0.2} label={{ position: 'center', value: 'MIGRATE', fill: '#64748B', fontSize: 10, fontWeight: 'bold' }} />
                            <ReferenceArea
                                x1={50} x2={100} y1={50} y2={100}
                                fill="#3B82F6" fillOpacity={0.1}
                                stroke="#3B82F6" strokeOpacity={0.3}
                                label={{ position: 'center', value: 'ENCAPSULATE', fill: '#3B82F6', fontSize: 10, fontWeight: 'bold' }}
                            />

                            <Tooltip content={<CustomTooltip />} />
                            <Scatter name="Systems" data={systems}>
                                {systems.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            entry.status === 'blocked' ? '#EF4444' :
                                                entry.status === 'at_risk' ? '#F59E0B' :
                                                    '#22C55E'
                                        }
                                        strokeWidth={2}
                                        stroke="#0F172A"
                                    />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>

                    {/* Axis Labels */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-[#64748B] tracking-widest pointer-events-none">
                        CRITICALITY (Y)
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#64748B] tracking-widest pointer-events-none">
                        CAPITAL AVAILABILITY (X)
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
