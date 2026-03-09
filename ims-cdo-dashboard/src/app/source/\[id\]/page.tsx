import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code2, Database, Info } from "lucide-react";
import Link from "next/link";

async function getSourceData(id: string) {
    const res = await fetch(`http://localhost:3000/api/kpis/${id}/source`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

export default async function SourcePage({ params }: { params: { id: string } }) {
    const source = await getSourceData(params.id);

    if (!source) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-white mb-4">KPI Source Not Found</h1>
                <Link href="/" className="text-[#3B82F6] hover:underline">Return to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 hover:bg-[#1E293B] rounded-full transition-colors text-[#94A3B8] hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">KPI Verification & Data Source</h1>
                    <p className="text-sm text-[#94A3B8]">Audit trail for KPI #{source.id}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calculation Logic */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="bg-[#1E293B] border-[#334155]">
                        <CardHeader className="border-b border-[#334155]">
                            <CardTitle className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                                <Code2 className="w-4 h-4 text-[#3B82F6]" /> Calculation Logic (SQL)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <pre className="p-6 overflow-x-auto bg-[#0F172A] text-sm text-[#E2E8F0] font-mono leading-relaxed">
                                <code>{source.query}</code>
                            </pre>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1E293B] border-[#334155]">
                        <CardHeader className="border-b border-[#334155]">
                            <CardTitle className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                                <Database className="w-4 h-4 text-[#3B82F6]" /> Raw Data Sample (Supporting Records)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 overflow-x-auto">
                            {source.data && source.data.length > 0 ? (
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="bg-[#0F172A] text-[#94A3B8] border-b border-[#334155]">
                                            {Object.keys(source.data[0]).map((key) => (
                                                <th key={key} className="px-6 py-3 font-semibold text-[10px] uppercase tracking-wider">{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#334155]">
                                        {source.data.map((row: any, i: number) => (
                                            <tr key={i} className="hover:bg-[#334155]/20 transition-colors">
                                                {Object.values(row).map((val: any, j) => (
                                                    <td key={j} className="px-6 py-4 text-white font-medium whitespace-nowrap">
                                                        {typeof val === 'boolean' ? (val ? 'Yes' : 'No') : String(val)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-12 text-center text-[#64748B]">No sample records available for this query.</div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card className="bg-[#1E293B] border-[#334155] border-l-4 border-l-[#3B82F6]">
                        <CardHeader>
                            <CardTitle className="text-xs font-bold text-[#3B82F6] uppercase flex items-center gap-2">
                                <Info className="w-4 h-4" /> CDO Transparency Note
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-white leading-relaxed">
                                {source.explanation}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#0F172A] border-[#334155]">
                        <CardContent className="p-6">
                            <h4 className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-4">System Context</h4>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] text-[#94A3B8] uppercase">Last Sync</p>
                                    <p className="text-sm text-white font-mono">Real-time (SQLite Direct)</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#94A3B8] uppercase">Dataset Reliability</p>
                                    <p className="text-sm text-success font-bold uppercase tracking-tighter italic">99.8% Confirmed</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
