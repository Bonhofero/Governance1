import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CDODashboard from "./dashboards/CDODashboard";
import OperationsDashboard from "./dashboards/OperationsDashboard";
import FinanceDashboard from "./dashboards/FinanceDashboard";

export default function DashboardRouter() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    if (user.role === "CDO") return <CDODashboard />;
    if (user.role === "OPERATIONS") return <OperationsDashboard />;
    if (user.role === "FINANCE") return <FinanceDashboard />;

    return <Navigate to="/login" />;
}
