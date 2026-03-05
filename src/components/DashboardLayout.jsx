import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ centerContent, rightPanel }) {
    const { user, logout } = useAuth();

    return (
        <div className="dashboard active" id="dashboard">
            <div className="top-bar">
                <div className="top-bar-left" style={{ flex: 1 }}>
                    <div className="municipality-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', color: 'var(--navy)' }}>
                        <span style={{ fontSize: '1.5rem' }}>🏛️</span> Eskilstuna
                    </div>
                </div>
                <div className="top-bar-center" style={{ flex: 1, textAlign: 'center', fontWeight: '600', fontSize: '1.1rem', color: 'var(--navy)' }}>
                    Portfolio Overview
                </div>
                <div className="top-bar-right" style={{ flex: 2, justifyContent: 'flex-end', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderRadius: '6px', width: 'auto', margin: 0 }}>+ Add initiative / Add system</button>
                    <div className="user-profile" style={{ fontSize: '0.9rem', color: 'var(--gray-600)', fontWeight: 500 }}>
                        {user.name} · {user.title}
                    </div>
                    <div className="notification-bell">🔔 <span className="notification-badge">3</span></div>
                    <button className="btn-logout" onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-600)' }}>Log out</button>
                </div>
            </div>

            <div style={{ display: 'flex', width: '100%' }}>
                <Sidebar />

                <main className="main-content">
                    <div className="content-area">
                        <div className="content-layout">
                            <div className="center-column">
                                <section className="page-section active">
                                    {centerContent}
                                </section>
                            </div>

                            <div className="right-column action-panel">
                                <h3 style={{ fontSize: '1rem', color: 'var(--navy)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Action Required</h3>
                                {rightPanel}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
