// src/features/sign-up/components/OperatorStatus.tsx
interface OperatorStatusProps {
  callsign: string;
  validations: {
    callsign: boolean;
    email: boolean;
    password: boolean;
    confirmation: boolean;
    terms: boolean;
  };
}

export function OperatorStatus({ callsign, validations }: OperatorStatusProps) {
  const totalValidos = Object.values(validations).filter(Boolean).length;

  const statusItems = [
    {
      label: "CALLSIGN",
      isValid: validations.callsign,
      pendingText: "PENDING",
    },
    { label: "EMAIL", isValid: validations.email, pendingText: "PENDING" },
    {
      label: "PASSWORD",
      isValid: validations.password,
      pendingText: "PENDING",
    },
    {
      label: "CONFIRMATION",
      isValid: validations.confirmation,
      pendingText: "PENDING",
    },
    { label: "TERMS", isValid: validations.terms, pendingText: "REQUIRED" },
  ];

  return (
    <div className="md:col-span-5 space-y-12 pr-4 text-left">
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 border border-nexus-accent flex items-center justify-center p-0.5 rounded-full">
          <div className="w-2 h-2 bg-nexus-accent rounded-full animate-pulse" />
        </div>
        <span className="text-sm font-bold tracking-widest uppercase text-slate-100">
          NEONCORE
        </span>
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-slate-100 leading-none">
          // JOIN THE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-nexus-muted">
            NEXUS
          </span>
        </h1>
      </div>

      <div className="border-t border-nexus-border pt-6 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] text-nexus-muted block uppercase">
              OPERATOR ID
            </span>
            <span className="text-xl font-bold tracking-wide uppercase text-slate-100">
              {callsign.trim() || "UNASSIGNED"}
            </span>
          </div>
          <span className="text-xs text-nexus-accent font-bold">
            {totalValidos}/5 READY
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-nexus-muted uppercase">
          {statusItems.map((item) => (
            <div
              key={item.label}
              className="flex justify-between border-b border-nexus-border/30 py-1"
            >
              <span>{item.label}</span>
              <span
                className={
                  item.isValid ? "text-nexus-strong" : "text-nexus-muted"
                }
              >
                {item.isValid ? "OK" : item.pendingText}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
