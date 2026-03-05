import DashboardLayout from "../../components/DashboardLayout";

export default function CDODashboard() {
    const centerContent = (
        <div className="dashboard-content-area">
            <div className="page-header">
                <h1>Infrastructure Map</h1>
                <p>System overlaps · Integration health · Redundancy view</p>
            </div>
            <div className="kpi-grid">
                <div className="kpi-card"><div className="kpi-label">Total Systems</div><div className="kpi-value">247</div><div className="kpi-trend">Across 12 departments</div></div>
                <div className="kpi-card danger"><div className="kpi-label">Systems at Risk</div><div className="kpi-value">34</div><div className="kpi-trend up">↑ 6 from last month</div></div>
                <div className="kpi-card warning"><div className="kpi-label">Maintenance vs Dev</div><div className="kpi-value">87%</div><div className="kpi-trend">Target: 60%</div></div>
                <div className="kpi-card success"><div className="kpi-label">Initiatives</div><div className="kpi-value">23</div><div className="kpi-trend down">↓ 3 completed</div></div>
            </div>
            <div className="system-map" style={{ height: "280px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <em style={{ color: "var(--gray-600)" }}>(System Map Visualization)</em>
            </div>
        </div>
    );

    const rightPanel = (
        <div className="dashboard-action-panel">
            <h3>Active Initiatives</h3>
            <div className="alert-banner warning">
                <span className="icon">⚡</span>
                <div>
                    <strong style={{ display: "block", fontSize: "1rem", marginBottom: "0.25rem" }}>CRM Upgrade</strong>
                    <span style={{ fontSize: "0.85rem" }}>Decision needed by Friday</span>
                </div>
            </div>
            <h3>Flagged Governance Issues</h3>
            <div className="alert-banner" style={{ background: "var(--red)", marginBottom: "1rem" }}>
                <span className="icon">🚨</span>
                <div>
                    <strong style={{ display: "block", fontSize: "1rem", marginBottom: "0.25rem" }}>Legacy Server A</strong>
                    <span style={{ fontSize: "0.85rem" }}>End of life - no failover</span>
                </div>
            </div>
        </div>
    );

    return <DashboardLayout centerContent={centerContent} rightPanel={rightPanel} />;
}
