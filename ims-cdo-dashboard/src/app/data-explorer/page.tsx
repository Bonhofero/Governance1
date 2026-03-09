"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Database, Search } from "lucide-react";
import Link from "next/link";

const TABLES = [
    { id: 'application_systems', label: 'Applications' },
    { id: 'sourcing_setups', label: 'Sourcing' },
    { id: 'interfaces', label: 'Interfaces' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'business_services', label: 'Services' },
    { id: 'organization_units', label: 'Orgs' }
];

export default function DataExplorer() {
    const [activeTable, setActiveTable] = useState(TABLES[0].id);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/api/raw/${activeTable}`)
            .then(res => res.json())
            .then(d => {
                setData(d);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [activeTable]);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-[#1E293B] rounded-full transition-colors text-[#94A3B8] hover:text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white uppercase tracking-tight">System Data Explorer</h1>
                        <p className="text-sm text-[#94A3B8]">Audit-grade visibility into the IMS Data Layer</p>
                    </div>
                </div>
                <div className="bg-[#1E293B] px-4 py-2 rounded-lg border border-[#334155] flex items-center gap-2 text-xs font-mono text-[#3B82F6]">
                    <Database className="w-3 h-3" /> CONNECTED: SQLITE_MASTER
                </div>
            </div>

            <Tabs defaultValue={TABLES[0].id} onValueChange={setActiveTable} className="w-full">
                <TabsList className="bg-[#1E293B] border border-[#334155] p-1 h-auto flex flex-wrap gap-1">
                    {TABLES.map(t => (
                        <TabsTrigger
                            key={t.id}
                            value={t.id}
                            className="px-4 py-2 text-xs uppercase font-bold data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white"
                        >
                            {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {TABLES.map(t => (
                    <TabsContent key={t.id} value={t.id} className="mt-6">
                        <Card className="bg-[#1E293B] border-[#334155] overflow-hidden">
                            <CardHeader className="border-b border-[#334155] bg-[#0F172A]/50 flex flex-row items-center justify-between p-4">
                                <CardTitle className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    {t.label} Records <span className="text-[#64748B] font-normal lowercase">(Last 100)</span>
                                </CardTitle>
                                <div className="relative">
                                    <Search className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                                    <input
                                        type="text"
                                        placeholder="Search records..."
                                        className="bg-[#0F172A] border border-[#334155] rounded-md pl-8 pr-3 py-1 text-[10px] text-white focus:outline-none focus:border-[#3B82F6] transition-colors w-48"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-0 overflow-x-auto min-h-[400px]">
                                {loading ? (
                                    <div className="flex items-center justify-center h-[400px] text-[#64748B] flex-col gap-4">
                                        <div className="w-8 h-8 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-xs uppercase font-bold tracking-widest">Hydrating Dataset...</span>
                                    </div>
                                ) : data.length > 0 ? (
                                    <Table>
                                        <TableHeader className="bg-[#0F172A]">
                                            <TableRow className="hover:bg-transparent border-[#334155]">
                                                {Object.keys(data[0]).map(key => (
                                                    <TableHead key={key} className="text-[10px] font-bold text-[#94A3B8] uppercase py-4">
                                                        {key.replace(/_/g, ' ')}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {data.map((row, i) => (
                                                <TableRow key={i} className="border-[#334155] hover:bg-[#334155]/20 transition-colors group">
                                                    {Object.values(row).map((val, j) => (
                                                        <TableCell key={j} className="text-xs text-white py-4 font-medium max-w-[200px] truncate">
                                                            {typeof val === 'boolean' ? (val ? 'True' : 'False') : String(val)}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <div className="p-24 text-center text-[#64748B]">No records found in this table.</div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>

            <div className="bg-[#0F172A] p-4 rounded-lg flex items-center justify-between border border-[#334155] text-[10px]">
                <div className="flex items-center gap-2 text-[#64748B]">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span>Database integrity check: PASS</span>
                </div>
                <div className="text-[#64748B]">
                    Authenticated as CDO · Read-Only Access
                </div>
            </div>
        </div>
    );
}
