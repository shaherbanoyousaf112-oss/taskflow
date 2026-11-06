import { FiFolderPlus } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import Button from "../components/common/Button";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Hello, {user?.name} </h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Here's what's happening in your workspaces.
          </p>
        </div>

        {/* Empty state: jab tak workspace nahi banta */}
        <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 rounded-full bg-brand-50 p-4 text-brand-600 dark:bg-brand-900/40">
            <FiFolderPlus size={28} />
          </div>
          <h3 className="text-lg font-semibold">No workspaces yet</h3>
          <p className="mb-6 mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Create your first workspace to start organizing tasks with your team.
          </p>
          <Button>Create workspace</Button>
        </div>
      </main>
    </div>
  );
}