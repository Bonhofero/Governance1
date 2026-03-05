"use client";

// src/context/auth-context.tsx
// ─────────────────────────────────────────────────────────────
// AUTH CONTEXT
// Provides the authenticated user object globally across the app.
// Components use useAuth() to access: user.name, user.role,
// user.title, user.email — without prop drilling.
//
// login(user)  → stores user, makes dashboard routing possible
// logout()     → clears user, redirects to /login
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/lib/users";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    isMounted: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    // Load user from sessionStorage on mount (for simple persistence)
    useEffect(() => {
        setIsMounted(true);
        const storedUser = sessionStorage.getItem("ims_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
            }
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        sessionStorage.setItem("ims_user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("ims_user");
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, isMounted, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
