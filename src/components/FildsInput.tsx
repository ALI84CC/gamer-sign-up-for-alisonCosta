// src/components/FildsInput.tsx
export interface FildsInputProps {
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  erro?: string;
}

export function FildsInput({
  name,
  label,
  value,
  onChange,
  disabled = false,
  placeholder,
  type = "text",
  erro,
}: FildsInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full bg-slate-950 px-4 py-2.5 rounded text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors border
          ${
            erro
              ? "border-red-500 focus:border-red-500" // Borda vermelha se houver erro
              : "border-slate-800 focus:border-cyan-500" // Borda padrão/cyan
          }`}
      />
      {/* Renderização condicional do alerta de erro abaixo do input */}
      {erro && (
        <span className="text-xs font-semibold text-red-400 tracking-wide animate-pulse">
          {erro}
        </span>
      )}
    </div>
  );
}
