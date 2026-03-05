import DashboardLayout from "../../components/DashboardLayout";

export default function CDODashboard() {
    const centerContent = (
        <div className="dashboard-content-area">
            <div className="page-header">
                <h1>Infrastructure Map</h1>
                <p>System overlaps · Integration health · Redundancy view</p>
            </div>

            <div className="system-map">
                <div className="map-container" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <em style={{ color: 'var(--gray-600)' }}>(Map Visualization Area)</em>
                </div>
            </div>

            <div className="page-header" style={{ marginTop: '2rem' }}>
                <h1>Active Initiatives</h1>
                <p>Portfolio status · Quick wins · Moonshots</p>
            </div>

            <div className="kpi-grid">
                <div className="kpi-card success">
                    <div className="kpi-label">Quick Wins</div>
                    <div className="kpi-value">8</div>
                    <div className="kpi-trend">Ready for deployment</div>
                </div>
                <div className="kpi-card warning">
                    <div className="kpi-label">Moonshots</div>
                    <div className="kpi-value">4</div>
                    <div className="kpi-trend">High risk / High reward</div>
                </div>
            </div>
        </div>
    );

    const rightPanel = (
        <div className="dashboard-action-panel">
            <h3>Innovation Pipeline</h3>
            <div className="alert-banner" style={{ background: 'var(--teal)', marginBottom: '1rem' }}>
                <div>
                    <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.25rem' }}>3 Initiatives Ready</strong>
                    <span style={{ fontSize: '0.85rem' }}>Awaiting CDO decision</span>
                </div>
            </div>

            <h3>Flagged Governance Issues</h3>
            <div className="alert-banner warning">
                <span className="icon">⚠️</span>
                <div>
                    <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.25rem' }}>Blocked Progress</strong>
                    <span style={{ fontSize: '0.85rem' }}>Governance blocking 2 initiatives</span>
                </div>
            </div>
        </div>
    );

    return <DashboardLayout centerContent={centerContent} rightPanel={rightPanel} />;
}
