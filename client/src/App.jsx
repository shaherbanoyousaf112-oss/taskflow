import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/common/ProtectedRoute";
import GuestRoute from "./components/common/GuestRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import WorkspacePage from "./pages/WorkspacePage";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/workspaces/:id" element={<WorkspacePage />} />
</Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}