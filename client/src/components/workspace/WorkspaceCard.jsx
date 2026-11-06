import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";

const roleStyles = {
  owner: "bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200",
  admin: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
  member: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200",
  viewer: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export default function WorkspaceCard({ workspace }) {
  return (
    <Link
      to={`/workspaces/${workspace._id}`}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white">
          {workspace.name.charAt(0).toUpperCase()}
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${roleStyles[workspace.role]}`}
        >
          {workspace.role}
        </span>
      </div>

      <h3 className="truncate font-semibold group-hover:text-brand-600">
        {workspace.name}
      </h3>
      <p className="mt-1 line-clamp-2 min-h-10 text-sm text-slate-500 dark:text-slate-400">
        {workspace.description || "No description"}
      </p>

      <div className="mt-4 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
        <FiUsers size={14} />
        {workspace.memberCount} {workspace.memberCount === 1 ? "member" : "members"}
      </div>
    </Link>
  );
}