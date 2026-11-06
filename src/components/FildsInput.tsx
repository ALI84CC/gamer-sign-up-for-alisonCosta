// src/components/FildsInput.tsx
export interface FildsInputProps {
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
}

export function FildsInput({
  name,
  label,
  value,
  onChange,
  disabled = false,
  placeholder,
  type = "text",
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
        className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 px-4 py-2.5 rounded text-sm focus:outline-none focus:border-cyan-500 transition-colors"
      />
    </div>
  );
}
