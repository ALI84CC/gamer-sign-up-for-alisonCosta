// src/components/Button.tsx
import type { MouseEvent, ReactNode } from "react";

export interface ButtonProps {
  texto?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
}

export function Button({
  texto,
  onClick,
  disabled,
  variant = "primary",
  children,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
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
