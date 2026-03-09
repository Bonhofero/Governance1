import { AmbidexterityMeter } from "@/components/dashboard/ambidexterity-meter";
import { KPICard } from "@/components/dashboard/kpi-card";
import { ShadowInnovationDetector } from "@/components/dashboard/shadow-innovation";
import { InitiativeKanban } from "@/components/dashboard/initiative-kanban";
import { InfrastructureQuadrant } from "@/components/dashboard/infrastructure-quadrant";
// remove mockData import

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/dashboard', { cache: 'no-store' });
  const dashboardData = await res.json();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Section A — Ambidexterity Meter */}
      <AmbidexterityMeter
        efficiency={dashboardData.ambidexterity.efficiency_pct}
        innovation={dashboardData.ambidexterity.innovation_pct}
        internal={dashboardData.ambidexterity.internal_pct}
        external={dashboardData.ambidexterity.external_pct}
        targetEfficiency={dashboardData.ambidexterity.target_efficiency_pct}
      />

      {/* Section B — Six Ambidexterity KPI Cards */}
      <div>
        <h3 className="text-sm font-bold text-[#64748B] uppercase tracking-widest mb-4">Strategic Transformation KPIs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData.kpis.map((kpi: any) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </div>

      {/* Grid for C and E */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section C — Shadow Innovation Detector */}
        <ShadowInnovationDetector
          shadowPct={dashboardData.shadow_innovation.shadow_pct}
          anomalies={dashboardData.shadow_innovation.anomalies}
        />

        {/* Section E — Infrastructure Renewal Status */}
        <InfrastructureQuadrant systems={dashboardData.infrastructure} />
      </div>

      {/* Section D — Initiative Pipeline */}
      <InitiativeKanban initiatives={dashboardData.initiatives} />

      <div className="pt-8 text-center text-[10px] text-[#475569]">
        Designed for Eskilstuna kommun · IMS Governance Framework 2026
      </div>
    </div>
  );
}
