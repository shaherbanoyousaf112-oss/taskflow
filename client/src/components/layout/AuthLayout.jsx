import { FiCheckSquare, FiUsers, FiZap } from "react-icons/fi";
import ThemeToggle from "../common/ThemeToggle";

const features = [
  { icon: FiCheckSquare, text: "Organize tasks on drag-and-drop boards" },
  { icon: FiUsers, text: "Collaborate with roles and permissions" },
  { icon: FiZap, text: "See changes instantly, in real time" },
];

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: brand panel (sirf bade screen par) */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-brand-600 via-brand-700 to-brand-900 p-12 text-white lg:flex">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex items-center gap-2 text-2xl font-bold">
          <FiCheckSquare /> TaskFlow
        </div>

        <div className="relative">
          <h2 className="mb-8 text-4xl font-bold leading-tight">
            Plan work. Move faster. <br /> Ship together.
          </h2>
          <ul className="space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-brand-100">
                <span className="rounded-lg bg-white/15 p-2">
                  <Icon size={18} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-brand-200">
          © {new Date().getFullYear()} TaskFlow
        </p>
      </div>

      {/* Right: form */}
      <div className="relative flex items-center justify-center px-6 py-12">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 text-xl font-bold text-brand-600 lg:hidden">
            <FiCheckSquare /> TaskFlow
          </div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mb-8 mt-2 text-slate-500 dark:text-slate-400">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}