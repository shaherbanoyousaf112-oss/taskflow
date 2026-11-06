import { useNavigate } from "react-router-dom";
import { FiCheckSquare, FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import ThemeToggle from "../common/ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 text-lg font-bold text-brand-600">
          <span className="rounded-lg bg-brand-600 p-1.5 text-white">
            <FiCheckSquare size={16} />
          </span>
          TaskFlow
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <div className="flex items-center gap-2 pl-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-900 dark:text-brand-200">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="hidden text-sm font-medium sm:block">{user?.name}</span>
          </div>

          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}