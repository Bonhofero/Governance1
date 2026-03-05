// src/lib/users.ts
// ─────────────────────────────────────────────────────────────
// MOCK USER DATABASE
// In a real system, these users would be pre-registered by an
// IT administrator during onboarding. The role field is set at
// registration and never shown or chosen by the user at login.
// After authentication, the app reads this role and routes
// the user to their role-specific dashboard automatically.
// ─────────────────────────────────────────────────────────────

export interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
    role: "CDO" | "OPERATIONS" | "FINANCE";
    title: string;
}

export const USERS: User[] = [
    {
        id: 1,
        name: "Elena Andersson",
        email: "elena.andersson@eskilstuna.se",
        password: "demo1234", // placeholder — replace with hashed auth in production
        role: "CDO",           // → routes to: CDODashboard
        title: "Chief Digital Officer"
    },
    {
        id: 2,
        name: "Arthur Bergström",
        email: "arthur.bergstrom@eskilstuna.se",
        password: "demo1234",
        role: "OPERATIONS",    // → routes to: OperationsDashboard
        title: "Head of Operations"
    },
    {
        id: 3,
        name: "Lars Lindqvist",
        email: "lars.lindqvist@eskilstuna.se",
        password: "demo1234",
        role: "FINANCE",       // → routes to: FinanceDashboard
        title: "Finance & Policy Director"
    }
];
