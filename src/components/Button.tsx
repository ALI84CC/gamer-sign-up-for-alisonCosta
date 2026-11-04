import type { ReactNode } from "react";

export interface ButtonProps {
  texto: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  children?: ReactNode; // 1. Adicionado aqui para aceitar conteúdo dentro das tags
}

export function Button({
  texto,
  onClick,
  disabled = false,
  variant = "primary",
  children, // 2. Adicionado aqui para aceitar conteúdo dentro das tags
}: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={`btn-${variant}`}>
      {children || texto}
    </button>
  );
}
