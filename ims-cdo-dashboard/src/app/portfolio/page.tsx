import PortfolioClientPage from "./client-page";

export default async function PortfolioPage() {
    const res = await fetch('http://localhost:3000/api/dashboard', { cache: 'no-store' });
    const dashboardData = await res.json();

    return <PortfolioClientPage initialData={dashboardData} />;
}
