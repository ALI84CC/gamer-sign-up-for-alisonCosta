// src/features/sign-up/components/PasswordMeter.tsx
import type { StrengthResult } from "../../sign-up/utils/calculateStrength";

interface PasswordMeterProps {
  password: string;
  strength: StrengthResult;
}

export function PasswordMeter({ password, strength }: PasswordMeterProps) {
  if (!password) return null;

  const textColors: Record<string, string> = {
    Weak: "text-nexus-weak",
    Fair: "text-amber-500",
    Good: "text-yellow-400",
    Strong: "text-nexus-strong",
  };

  const getBarColor = (barIndex: number) => {
    if (strength.score < barIndex) return "bg-neutral-800";
    if (strength.score === 1) return "bg-nexus-weak";
    if (strength.score === 2) return "bg-amber-500";
    if (strength.score === 3) return "bg-yellow-400";
    return "bg-nexus-strong";
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-bold uppercase">
        <span className="text-nexus-muted">Security Level:</span>
        <span className={textColors[strength.label] || ""}>
          {strength.label}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1 h-1 w-full bg-black overflow-hidden">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`h-full transition-colors duration-300 ${getBarColor(index)}`}
          />
        ))}
      </div>
    </div>
  );
}
