import KPIsClientPage from "./client-page";

export default async function KPIsPage() {
    const res = await fetch('http://localhost:3000/api/dashboard', { cache: 'no-store' });
    const dashboardData = await res.json();

    return <KPIsClientPage initialData={dashboardData} />;
}
