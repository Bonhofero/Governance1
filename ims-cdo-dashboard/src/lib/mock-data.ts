export type InitiativeType = "quick_win" | "moonshot" | "enterprise_anchor" | "venture" | "kill_zone";
export type InitiativeStage = "ideation" | "evaluation" | "active" | "scaling";
export type SystemStatus = "on_track" | "at_risk" | "blocked";
export type SystemStrategy = "accept" | "revamp" | "migrate" | "encapsulate";

export interface Initiative {
    id: string;
    name: string;
    owner: string;
    type: InitiativeType;
    stage: InitiativeStage;
    age_days: number;
    value_score: number;
    feasibility_score: number;
    status: "On Track" | "At Risk" | "Critical";
}

export interface KPI {
    id: number;
    label: string;
    current_value: number;
    target_value: number;
    trend: number[];
    unit: string;
    invert_scale?: boolean;
    definition: string;
    why_it_matters: string;
}

export interface System {
    name: string;
    criticality: number;
    capital_available: number;
    strategy: SystemStrategy;
    owner: string;
    status: SystemStatus;
}

export const mockData: {
    ambidexterity: any;
    kpis: KPI[];
    shadow_innovation: any;
    initiatives: Initiative[];
    infrastructure: System[];
} = {
    ambidexterity: {
        efficiency_pct: 84,
        innovation_pct: 16,
        internal_pct: 99,
        external_pct: 1,
        target_efficiency_pct: 60,
        target_innovation_pct: 40,
        source: "Magnusson et al., 2025 — Governance 2026",
    },
    kpis: [
        {
            id: 1,
            label: "% of budget on business development",
            current_value: 4.2,
            target_value: 15,
            trend: [3.8, 3.9, 4.1, 4.0, 4.1, 4.2],
            unit: "%",
            definition: "Total IT budget allocated to new business development vs. maintenance.",
            why_it_matters: "Determines the organization's ability to evolve rather than just maintaining legacy systems.",
        },
        {
            id: 2,
            label: "% of KPI1 that changes service delivery",
            current_value: 22,
            target_value: 60,
            trend: [18, 19, 21, 20, 21, 22],
            unit: "%",
            definition: "Percentage of development spend that directly modifies user-facing services.",
            why_it_matters: "Measures the impact of development budget on the end-user experience.",
        },
        {
            id: 3,
            label: "% of KPI2 tied to digital productivity",
            current_value: 45,
            target_value: 70,
            trend: [40, 42, 44, 43, 44, 45],
            unit: "%",
            definition: "Focus on productivity-enhancing digital tools and automation.",
            why_it_matters: "Ensures that digital initiatives are resulting in tangible efficiency gains for staff.",
        },
        {
            id: 4,
            label: "New digital services released / month",
            current_value: 2,
            target_value: 10,
            trend: [1, 1, 2, 1, 2, 2],
            unit: "releases/mo",
            definition: "The output frequency of new digital products or major service updates.",
            why_it_matters: "Reflects the agility and throughput of the digital transformation pipeline.",
        },
        {
            id: 5,
            label: "% of existing data used for decisions",
            current_value: 12,
            target_value: 40,
            trend: [10, 11, 11, 12, 12, 12],
            unit: "%",
            definition: "Ratio of structured data utilized in automated decision-making processes.",
            why_it_matters: "Key indicator of a data-driven culture and technical readiness for AI.",
        },
        {
            id: 6,
            label: "Years since KPIs were last updated",
            current_value: 8,
            target_value: 5,
            trend: [8, 8, 8, 8, 8, 8],
            unit: "years",
            invert_scale: true,
            definition: "The age of the current performance measurement framework.",
            why_it_matters: "Legacy KPIs often prevent modern transformation goals from being measured accurately.",
        },
    ],
    shadow_innovation: {
        shadow_pct: 21.2,
        anomalies: [
            {
                unit: "Social Services",
                type: "Unauthorized SaaS spend",
                confidence: 89,
                detail: "Detected 14 separate accounts for undocumented project management software outside IT governance.",
            },
            {
                unit: "Urban Planning",
                type: "Shadow API Integration",
                confidence: 94,
                detail: "Direct database access detected from a third-party analytics tool not in the system registry.",
            },
        ],
    },
    initiatives: [
        { id: "1", name: "AI Case Automation", owner: "Maria Svärd", type: "moonshot", stage: "active", age_days: 124, value_score: 85, feasibility_score: 40, status: "Critical" },
        { id: "2", name: "Legacy ERP Cleanup", owner: "Johan Holm", type: "enterprise_anchor", stage: "active", age_days: 450, value_score: 95, feasibility_score: 70, status: "On Track" },
        { id: "3", name: "Citizen Portal 2.0", owner: "Sara Lind", type: "venture", stage: "evaluation", age_days: 45, value_score: 70, feasibility_score: 65, status: "On Track" },
        { id: "4", name: "Cloud Migration Phase 1", owner: "Anders Ek", type: "enterprise_anchor", stage: "scaling", age_days: 200, value_score: 90, feasibility_score: 80, status: "On Track" },
        { id: "5", name: "IOT Waste Sensors", owner: "Erik Berg", type: "quick_win", stage: "scaling", age_days: 90, value_score: 60, feasibility_score: 90, status: "On Track" },
        { id: "6", name: "Digital Twins Lab", owner: "Sofia Gren", type: "venture", stage: "ideation", age_days: 15, value_score: 80, feasibility_score: 30, status: "At Risk" },
        { id: "7", name: "Automatic Permit Approval", owner: "Lars Björk", type: "moonshot", stage: "evaluation", age_days: 60, value_score: 92, feasibility_score: 35, status: "Critical" },
        { id: "8", name: "Internal Chatbot", owner: "Karin Alm", type: "quick_win", stage: "scaling", age_days: 120, value_score: 55, feasibility_score: 95, status: "On Track" },
    ],
    infrastructure: [
        { name: "Mainframe Core", criticality: 95, capital_available: 85, strategy: "encapsulate", owner: "Olof Lund", status: "on_track" },
        { name: "Legacy GIS", criticality: 40, capital_available: 30, strategy: "revamp", owner: "Sven Persson", status: "at_risk" },
        { name: "Old Payroll", criticality: 90, capital_available: 10, strategy: "migrate", owner: "Anna Söder", status: "blocked" },
        { name: "Archiving v1", criticality: 20, capital_available: 15, strategy: "accept", owner: "Per Öst", status: "on_track" },
        { name: "Document Store", criticality: 80, capital_available: 40, strategy: "migrate", owner: "Nils Wick", status: "at_risk" },
        { name: "Old Website CMS", criticality: 30, capital_available: 70, strategy: "revamp", owner: "Eva Kvist", status: "on_track" },
    ],
};
