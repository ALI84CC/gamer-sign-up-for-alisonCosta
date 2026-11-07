// src/components/Checkbox.tsx
import React from "react";

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  erro?: string; // 1. Mapeie a propriedade opcional de erro na interface
}

export function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  erro, // 2. Desestruture o erro aqui para utilizá-lo no componente
}: CheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label
        className={`flex items-start space-x-3 cursor-pointer select-none text-sm text-slate-300 hover:text-slate-100 transition-colors ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="relative flex items-center h-5">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className={`peer h-4 w-4 rounded bg-slate-950 accent-cyan-500 cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-500 border transition-all
              ${erro ? "border-red-500" : "border-slate-800 peer-checked:border-cyan-500"}`}
          />
        </div>
        <span className="text-xs leading-none pt-0.5">{label}</span>
      </label>

      {/* 3. Se houver erro, exibe a mensagem estilizada logo abaixo */}
      {erro && (
        <span className="text-xs font-semibold text-red-400 tracking-wide animate-pulse">
          {erro}
        </span>
      )}
    </div>
  );
}
