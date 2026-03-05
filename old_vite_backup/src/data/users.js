// Mock user store — in production, roles come from the database after IT admin onboarding
export const users = [
    {
        id: 1,
        name: "Elena Andersson",
        email: "elena.andersson@eskilstuna.se",
        password: "demo1234",
        role: "CDO",
        title: "Chief Digital Officer"
    },
    {
        id: 2,
        name: "Arthur Bergström",
        email: "arthur.bergstrom@eskilstuna.se",
        password: "demo1234",
        role: "OPERATIONS",
        title: "Head of Operations"
    },
    {
        id: 3,
        name: "Lars Lindqvist",
        email: "lars.lindqvist@eskilstuna.se",
        password: "demo1234",
        role: "FINANCE",
        title: "Finance & Policy Director"
    }
];
