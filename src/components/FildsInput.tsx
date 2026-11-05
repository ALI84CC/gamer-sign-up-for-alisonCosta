export interface FildsInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function FildsInput({
  label,
  value,
  onChange,
  disabled = false,
}: FildsInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label>
      {label}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </label>
  );
}
