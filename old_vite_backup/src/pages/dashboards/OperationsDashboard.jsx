import DashboardLayout from "../../components/DashboardLayout";

export default function OperationsDashboard() {
    const centerContent = (
        <div className="dashboard-content-area">
            <div className="page-header">
                <h1>Risk Heatmap</h1>
                <p>End-of-life servers · Single points of failure</p>
            </div>
            <div className="risk-matrix">
                <div className="matrix-container" style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <em style={{ color: "var(--gray-600)" }}>🔴 Critical: 8 &nbsp;|&nbsp; 🟡 Monitor: 14 &nbsp;|&nbsp; 🟢 Safe: 225</em>
                </div>
            </div>
            <div className="page-header" style={{ marginTop: "2rem" }}>
                <h1>System Dependency Graph</h1>
                <p>Connection mapping · Database dependencies</p>
            </div>
            <div className="system-map" style={{ height: "220px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <em style={{ color: "var(--gray-600)" }}>(Dependency Graph)</em>
            </div>
        </div>
    );

    const rightPanel = (
        <div className="dashboard-action-panel">
            <h3>End-of-Life Alerts</h3>
            <div className="alert-banner warning">
                <span className="icon">⚠️</span>
                <div>
                    <strong style={{ display: "block", fontSize: "1rem", marginBottom: "0.25rem" }}>Legacy Server B</strong>
                    <span style={{ fontSize: "0.85rem" }}>EOL in 23 days — no redundancy</span>
                </div>
            </div>
            <h3>Maintenance Deadlines</h3>
            <div className="alert-banner" style={{ background: "var(--teal)", marginBottom: "1rem" }}>
                <span className="icon">🔧</span>
                <div>
                    <strong style={{ display: "block", fontSize: "1rem", marginBottom: "0.25rem" }}>HR Portal patch</strong>
                    <span style={{ fontSize: "0.85rem" }}>Security update due Monday</span>
                </div>
            </div>
        </div>
    );

    return <DashboardLayout centerContent={centerContent} rightPanel={rightPanel} />;
}
