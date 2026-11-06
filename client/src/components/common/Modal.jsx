import { useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function Modal({ open, onClose, title, children }) {
  // Escape dabane par band ho
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()} // andar click par band na ho
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FiX size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}