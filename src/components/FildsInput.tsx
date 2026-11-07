// src/components/FildsInput.tsx
import React from "react";

export interface FildsInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  erro?: string;
  sucesso?: boolean; // Novo indicador visual de campo válido (Check verde)
}

export function FildsInput({
  label,
  value,
  onChange,
  disabled = false,
  placeholder,
  type = "text",
  erro,
  sucesso,
}: FildsInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col space-y-1.5 w-full font-mono text-left">
      <label className="text-[10px] font-bold uppercase tracking-widest text-nexus-muted flex items-center gap-1">
        <span>&gt;</span> {label}
      </label>

      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full bg-black px-4 py-2.5 rounded-none text-sm text-slate-100 placeholder-nexus-muted/50 focus:outline-none transition-all border
            ${
              erro
                ? "border-nexus-weak bg-nexus-weak/5"
                : sucesso
                  ? "border-nexus-strong focus:border-nexus-strong"
                  : "border-nexus-border focus:border-nexus-accent"
            }`}
        />

        {/* Ícone Indicador Lateral de Sucesso */}
        {sucesso && !erro && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-nexus-strong text-xs">
            ✓
          </span>
        )}
      </div>

      {erro && (
        <span className="text-[11px] text-nexus-weak flex items-center gap-1 tracking-wide mt-1">
          ⚠ {erro}
        </span>
      )}
    </div>
  );
}
