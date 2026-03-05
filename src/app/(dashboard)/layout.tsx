import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "IMS – CDO Dashboard",
  description: "Transformation intelligence for strategic leaders",
};

import { AuthProvider } from "@/context/auth-context";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#0F172A] min-h-screen text-slate-50 font-sans antialiased dark">
      <AuthProvider>
        <TooltipProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-[240px]">
              <Header title="Overview" />
              <main className="mt-16 p-8">
                {children}
              </main>
            </div>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </div>
  );
}
