import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USERS } from "../data/users";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Ensure we check against the full email
        const fullEmail = email.includes("@") ? email.trim() : `${email.trim()}@eskilstuna.se`;

        const user = USERS.find(
            (u) => u.email === fullEmail && u.password === password
        );

        if (!user) {
            setError("Invalid email or password. Please try again.");
            return;
        }

        login(user);
        navigate("/dashboard");
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <h1>IMS</h1>
                    <p>Your digital landscape, finally visible.</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Username</label>
                        <div style={{ display: 'flex', border: '2px solid var(--gray-200)', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'var(--white)' }}>
                            <input
                                id="email"
                                type="text"
                                placeholder="first.lastname"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ border: 'none', margin: 0, borderRadius: 0, outline: 'none', flex: 1, padding: '0.75rem 1rem' }}
                            />
                            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--gray-50)', borderLeft: '2px solid var(--gray-200)', color: 'var(--gray-600)', display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
                                @eskilstuna.se
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="login-error" style={{ color: 'var(--red)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{error}</p>}

                    <button type="submit" className="btn-primary">Log in</button>
                </form>

                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--gray-200)', fontSize: '0.85rem' }}>
                    <strong style={{ color: 'var(--teal)' }}>Demo Accounts (Password: demo1234):</strong>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li><strong>elena.andersson</strong> → CDO</li>
                        <li><strong>arthur.bergstrom</strong> → Operations</li>
                        <li><strong>lars.lindqvist</strong> → Finance</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
