import { AmbidexterityMeter } from "@/components/dashboard/ambidexterity-meter";
import { KPICard } from "@/components/dashboard/kpi-card";
import { ShadowInnovationDetector } from "@/components/dashboard/shadow-innovation";
import { InitiativeKanban } from "@/components/dashboard/initiative-kanban";
import { InfrastructureQuadrant } from "@/components/dashboard/infrastructure-quadrant";
import { mockData } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Section A — Ambidexterity Meter */}
      <AmbidexterityMeter
        efficiency={mockData.ambidexterity.efficiency_pct}
        innovation={mockData.ambidexterity.innovation_pct}
        internal={mockData.ambidexterity.internal_pct}
        external={mockData.ambidexterity.external_pct}
        targetEfficiency={mockData.ambidexterity.target_efficiency_pct}
      />

      {/* Section B — Six Ambidexterity KPI Cards */}
      <div>
        <h3 className="text-sm font-bold text-[#64748B] uppercase tracking-widest mb-4">Strategic Transformation KPIs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockData.kpis.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </div>

      {/* Grid for C and E */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section C — Shadow Innovation Detector */}
        <ShadowInnovationDetector
          shadowPct={mockData.shadow_innovation.shadow_pct}
          anomalies={mockData.shadow_innovation.anomalies}
        />

        {/* Section E — Infrastructure Renewal Status */}
        <InfrastructureQuadrant systems={mockData.infrastructure} />
      </div>

      {/* Section D — Initiative Pipeline */}
      <InitiativeKanban initiatives={mockData.initiatives} />

      <div className="pt-8 text-center text-[10px] text-[#475569]">
        Designed for Eskilstuna kommun · IMS Governance Framework 2026
      </div>
    </div>
  );
}
