"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Auto-append domain if not present
        let email = username.trim();
        if (!email.includes("@")) {
            email = email + "@eskilstuna.se";
        }

        // Hardcoded auth logic from original Vite project
        if (email === "elena.andersson@eskilstuna.se" && password === "demo1234") {
            router.push("/dashboard");
        } else {
            // In this demo, only Elena (CDO) has a dashboard.
            setError("Invalid email or password. Please try again with elena.andersson / demo1234.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <h1>IMS</h1>
                    <p>Your digital landscape, finally visible.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
                            <input
                                type="text"
                                placeholder="first.lastname"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ borderRadius: "6px 0 0 6px", flex: 1 }}
                                required
                            />
                            <span
                                style={{
                                    background: "var(--gray-100)",
                                    border: "1px solid var(--gray-300)",
                                    borderLeft: "none",
                                    padding: "0.75rem 0.75rem",
                                    borderRadius: "0 6px 6px 0",
                                    fontSize: "0.85rem",
                                    color: "var(--gray-600)",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                @eskilstuna.se
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <p style={{ color: "var(--red)", fontSize: "0.85rem", marginBottom: "1rem" }}>
                            {error}
                        </p>
                    )}
                    <button type="submit" className="btn-primary">
                        Log in
                    </button>
                </form>
                <div
                    style={{
                        marginTop: "2rem",
                        padding: "1rem",
                        background: "var(--gray-50)",
                        borderRadius: "8px",
                        fontSize: "0.8rem",
                        color: "var(--gray-600)",
                    }}
                >
                    <strong>Demo account (password: demo1234)</strong>
                    <div style={{ marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <span>elena.andersson → CDO Dashboard</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
