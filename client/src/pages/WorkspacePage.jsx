import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import Loader from "../components/common/Loader";
import { fetchWorkspace } from "../api/workspaceApi";
import getErrorMessage from "../utils/getErrorMessage";

export default function WorkspacePage() {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWorkspace(id)
      .then(setWorkspace)
      .catch((err) => setError(getErrorMessage(err)));
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="text-xl font-semibold">{error}</h2>
          <Link to="/dashboard" className="mt-4 inline-block text-brand-600 hover:underline">
            Back to dashboard
          </Link>
        </main>
      </div>
    );
  }

  if (!workspace) return <Loader />;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link
          to="/dashboard"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-600"
        >
          <FiArrowLeft size={14} /> Back to dashboard
        </Link>

        <h2 className="text-2xl font-bold">{workspace.name}</h2>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          {workspace.description || "No description"}
        </p>

        <h3 className="mb-3 mt-8 font-semibold">Members</h3>
        <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {workspace.members.map((m) => (
            <li key={m.user._id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{m.user.name}</p>
                <p className="text-xs text-slate-500">{m.user.email}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize dark:bg-slate-800">
                {m.role}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-slate-400">Boards will appear here in the next step.</p>
      </main>
    </div>
  );
}