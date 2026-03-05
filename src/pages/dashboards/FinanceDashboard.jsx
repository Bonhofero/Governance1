import DashboardLayout from "../../components/DashboardLayout";

export default function FinanceDashboard() {
    const centerContent = (
        <div className="dashboard-content-area">
            <div className="page-header">
                <h1>Total Cost of Ownership</h1>
                <p>Legacy vs Modern system costs · Technical debt translated to SEK</p>
            </div>
            <div className="risk-matrix">
                <div className="matrix-container" style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <em style={{ color: "var(--gray-600)" }}>(Cost Ownership Visualization Area)</em>
                </div>
            </div>
            <div className="page-header" style={{ marginTop: "2rem" }}>
                <h1>Cost Savings Projections</h1>
                <p>Status quo cost vs Transformation cost over 3 years</p>
            </div>
            <div className="system-map" style={{ height: "250px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <em style={{ color: "var(--gray-600)" }}>(Projections Graph)</em>
            </div>
        </div>
    );

    const rightPanel = (
        <div className="dashboard-action-panel">
            <h3>Budget Flags</h3>
            <div className="alert-banner warning">
                <span className="icon">⚠️</span>
                <div>
                    <strong style={{ display: "block", fontSize: "1rem", marginBottom: "0.25rem" }}>HR System Overrun</strong>
                    <span style={{ fontSize: "0.85rem" }}>Maintenance costs exceeded by 15%</span>
                </div>
            </div>
            <h3>Decommissioning Opportunities</h3>
            <div className="alert-banner" style={{ background: "var(--teal)", marginBottom: "1rem" }}>
                <span className="icon">💰</span>
                <div>
                    <strong style={{ display: "block", fontSize: "1rem", marginBottom: "0.25rem" }}>Save 500k SEK</strong>
                    <span style={{ fontSize: "0.85rem" }}>Retire Legacy Server C by Q3</span>
                </div>
            </div>
        </div>
    );

    return <DashboardLayout centerContent={centerContent} rightPanel={rightPanel} />;
}
