"use client";

import { useAuth } from "@/context/auth-context";
import { CDODashboard } from "@/components/dashboards/cdo-dashboard";
import { OperationsDashboard } from "@/components/dashboards/operations-dashboard";
import { FinanceDashboard } from "@/components/dashboards/finance-dashboard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRouter() {
  const { user, isMounted } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isMounted && !user) {
      router.replace("/");
    }
  }, [user, isMounted, router]);

  if (!isMounted || !user) return null; // Avoid flashing content before redirect

  if (user.role === "CDO") return <CDODashboard />;
  if (user.role === "OPERATIONS") return <OperationsDashboard />;
  if (user.role === "FINANCE") return <FinanceDashboard />;

  // Fallback
  return null;
}
