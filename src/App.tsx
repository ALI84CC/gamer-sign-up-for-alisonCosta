// src/App.tsx
import { Button } from "./components/Button";
import { FildsInput } from "./components/FildsInput";
import { Checkbox } from "./components/Checkbox";
import { useSignUpForm } from "../src/features/sign-up/hooks/useSignUpForm";

function App() {
  const {
    callSign,
    setCallSign,
    email,
    setEmail,
    password,
    setPassword,
    termsAccepted,
    setTermsAccepted,
    erros,
    passwordStrength,
    lidarComEnvio,
  } = useSignUpForm();

  // Computando dinamicamente o progresso do Operador para o painel esquerdo
  const totalValidos = [
    callSign.length >= 3 && callSign.length <= 20,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    password.length >= 8,
    password.length >= 8, // Representando a confirmação
    termsAccepted,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-nexus-bg text-slate-200 font-mono flex items-center justify-center p-4 md:p-8 selection:bg-nexus-accent selection:text-black">
      {/* Container Central Duplo */}
      <div className="w-full max-w-5xl grid md:grid-cols-12 gap-8 items-center">
        {/* COLUNA ESQUERDA: Status do Nexus */}
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
            <p className="text-xs text-nexus-muted uppercase tracking-widest">
              Initialize your neoncore identity
            </p>
          </div>

          {/* Painel Tático de Progresso (Muda dinamicamente baseado nos inputs!) */}
          <div className="border-t border-nexus-border pt-6 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] text-nexus-muted block uppercase">
                  OPERATOR ID
                </span>
                <span className="text-xl font-bold tracking-wide uppercase text-slate-100">
                  {callSign || "UNASSIGNED"}
                </span>
              </div>
              <span className="text-xs text-nexus-accent font-bold">
                {totalValidos}/5 READY
              </span>
            </div>

            {/* Checklist de Carregamento de Módulos */}
            <div className="space-y-1.5 text-xs text-nexus-muted uppercase">
              <div className="flex justify-between border-b border-nexus-border/30 py-1">
                <span>CALLSIGN</span>
                <span
                  className={
                    callSign.length >= 3
                      ? "text-nexus-strong"
                      : "text-nexus-weak animate-pulse"
                  }
                >
                  {callSign.length >= 3 ? "OK" : "PENDING"}
                </span>
              </div>
              <div className="flex justify-between border-b border-nexus-border/30 py-1">
                <span>EMAIL</span>
                <span
                  className={
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                      ? "text-nexus-strong"
                      : "text-nexus-muted"
                  }
                >
                  {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "OK" : "PENDING"}
                </span>
              </div>
              <div className="flex justify-between border-b border-nexus-border/30 py-1">
                <span>PASSWORD</span>
                <span
                  className={
                    password.length >= 8
                      ? "text-nexus-strong"
                      : "text-nexus-muted"
                  }
                >
                  {password.length >= 8 ? "OK" : "PENDING"}
                </span>
              </div>
              <div className="flex justify-between border-b border-nexus-border/30 py-1">
                <span>TERMS</span>
                <span
                  className={
                    termsAccepted ? "text-nexus-strong" : "text-nexus-muted"
                  }
                >
                  {termsAccepted ? "OK" : "REQUIRED"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: Caixa do Formulário (Cantos de Mira Laser) */}
        <div className="md:col-span-7 relative bg-nexus-card border border-nexus-border p-8 rounded-none shadow-2xl">
          {/* Decorações angulares de interface futurista (Cantos amarelos dos prints) */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-nexus-accent -mt-[1px] -ml-[1px]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-nexus-accent -mb-[1px] -mr-[1px]" />

          <form onSubmit={lidarComEnvio} noValidate className="space-y-5">
            <div className="flex justify-between items-center border-b border-nexus-border pb-4 mb-2 text-left">
              <h2 className="text-sm font-bold tracking-wider text-slate-300 uppercase">
                New Operator
              </h2>
              <span className="text-[10px] text-nexus-muted uppercase tracking-widest">
                All Fields Required
              </span>
            </div>

            {/* Call Sign Input */}
            <FildsInput
              label="CALLSIGN"
              placeholder="e.g. Vortex_07"
              value={callSign}
              onChange={setCallSign}
              erro={erros.callsign}
              sucesso={callSign.length >= 3}
            />

            {/* Email Input */}
            <FildsInput
              label="EMAIL"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              erro={erros.email}
              sucesso={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
            />

            {/* Password Input com Barra de Força Dinâmica */}
            <div className="space-y-2">
              <FildsInput
                label="PASSWORD"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                erro={erros.password}
              />

              {password && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span className="text-nexus-muted">Security Level:</span>
                    <span
                      className={`
                      ${passwordStrength === "Weak" && "text-nexus-weak"}
                      ${passwordStrength === "Fair" && "text-fair"}
                      ${passwordStrength === "Good" && "text-good"}
                      ${passwordStrength === "Strong" && "text-nexus-strong"}
                    `}
                    >
                      {passwordStrength}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 h-1 w-full bg-black rounded-none overflow-hidden">
                    <div
                      className={`h-full transition-colors duration-300 ${passwordStrength === "Weak" ? "bg-nexus-weak" : passwordStrength === "Fair" ? "bg-fair" : passwordStrength === "Good" ? "bg-good" : "bg-nexus-strong"}`}
                    />
                    <div
                      className={`h-full transition-colors duration-300 ${passwordStrength !== "Weak" ? (passwordStrength === "Fair" ? "bg-fair" : passwordStrength === "Good" ? "bg-good" : "bg-nexus-strong") : "bg-nexus-border"}`}
                    />
                    <div
                      className={`h-full transition-colors duration-300 ${passwordStrength === "Good" || passwordStrength === "Strong" ? (passwordStrength === "Good" ? "bg-good" : "bg-nexus-strong") : "bg-nexus-border"}`}
                    />
                    <div
                      className={`h-full transition-colors duration-300 ${passwordStrength === "Strong" ? "bg-nexus-strong" : "bg-nexus-border"}`}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2">
              <Checkbox
                label="I accept the Terms of Service and Privacy Policy"
                checked={termsAccepted}
                onChange={() => setTermsAccepted((v) => !v)}
                erro={erros.acceptTerms}
              />
            </div>

            {/* Botão de Inicialização Neon */}
            <div className="pt-4">
              <Button
                texto="Initialize Account"
                disabled={totalValidos < 5}
                onClick={() => void 0}
                variant={totalValidos === 5 ? "primary" : "secondary"}
              />
            </div>

            <h5 className="text-center text-xs text-nexus-muted pt-2 uppercase tracking-wide">
              Already an operator?{" "}
              <a
                href="/login"
                className="text-nexus-accent hover:underline transition-all font-bold"
              >
                Log in
              </a>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
