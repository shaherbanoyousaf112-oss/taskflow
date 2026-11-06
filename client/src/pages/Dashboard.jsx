import { useEffect, useState } from "react";
import { FiFolderPlus, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import Button from "../components/common/Button";
import WorkspaceCard from "../components/workspace/WorkspaceCard";
import CreateWorkspaceModal from "../components/workspace/CreateWorkspaceModal";
import useAuth from "../hooks/useAuth";
import { fetchWorkspaces } from "../api/workspaceApi";
import getErrorMessage from "../utils/getErrorMessage";

export default function Dashboard() {
  const { user } = useAuth();
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchWorkspaces()
      .then(setWorkspaces)
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setLoading(false));
  }, []);

  const handleCreated = (workspace) =>
    setWorkspaces((prev) => [workspace, ...prev]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Hello, {user?.name} </h2>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Here are your workspaces.
            </p>
          </div>
          {workspaces.length > 0 && (
            <Button onClick={() => setModalOpen(true)}>
              <FiPlus size={16} /> New workspace
            </Button>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-44 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && workspaces.length === 0 && (
          <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-4 rounded-full bg-brand-50 p-4 text-brand-600 dark:bg-brand-900/40">
              <FiFolderPlus size={28} />
            </div>
            <h3 className="text-lg font-semibold">No workspaces yet</h3>
            <p className="mb-6 mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              Create your first workspace to start organizing tasks with your team.
            </p>
            <Button onClick={() => setModalOpen(true)}>Create workspace</Button>
          </div>
        )}

        {/* Workspaces grid */}
        {!loading && workspaces.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((w) => (
              <WorkspaceCard key={w._id} workspace={w} />
            ))}
          </div>
        )}
      </main>

      <CreateWorkspaceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleCreated}
      />
    </div>
  );
}