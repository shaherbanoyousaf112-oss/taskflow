export default function Textarea({ label, className = "", ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <textarea
        rows={3}
        className={`w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-900/40 ${className}`}
        {...props}
      />
    </div>
  );
}