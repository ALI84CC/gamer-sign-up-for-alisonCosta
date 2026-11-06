// src/components/Button.tsx
import type { ReactNode } from "react";

export interface ButtonProps {
  texto?: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  children?: ReactNode;
}

export function Button({
  texto,
  onClick,
  disabled,
  variant = "primary",
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full font-bold uppercase tracking-wider text-sm py-3 rounded transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
        ${
          variant === "primary"
            ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            : "bg-slate-800 text-slate-200 hover:bg-slate-700"
        }`}
    >
      {children || texto}
    </button>
  );
}
