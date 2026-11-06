export interface FildsInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  name?: string;
  type?: string;
  placeholder?: string;
}

export function FildsInput({
  label,
  value,
  onChange,
  disabled = false,
  name = "",
  type = "text",
  placeholder = "",
}: FildsInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        name={name || label}
        placeholder={placeholder}
      />
    </label>
  );
}
