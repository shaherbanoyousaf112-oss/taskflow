import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "./Loader";

export default function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}