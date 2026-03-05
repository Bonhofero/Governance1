export default function Sidebar() {
    return (
        <aside className="sidebar">
            <ul className="nav-menu">
                <li className="nav-item active"><span className="icon">🏠</span><span>Portfolio Overview</span></li>
                <li className="nav-item"><span className="icon">🗺️</span><span>Systems Map</span></li>
                <li className="nav-item"><span className="icon">⚠️</span><span>Risk & Alerts</span></li>
                <li className="nav-item"><span className="icon">📋</span><span>Reports</span></li>
                <li className="nav-item"><span className="icon">⚙️</span><span>Settings</span></li>
            </ul>
        </aside>
    );
}
