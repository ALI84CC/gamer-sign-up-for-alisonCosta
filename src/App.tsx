// src/App.tsx
import { Button } from "./components/Button";
import { FildsInput } from "./components/FildsInput";
import { Checkbox } from "./components/Checkbox";
import { useSignUpForm } from "./features/sign-up/hooks/useSignUpForm";

function App() {
  // Consumindo toda a lógica isolada do nosso hook customizado
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <form
        onSubmit={lidarComEnvio}
        noValidate
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-2xl space-y-5"
      >
        {/* Cabeçalho */}
        <div className="space-y-1 border-b border-slate-800 pb-4 mb-2">
          <h1 className="text-2xl font-bold tracking-wider text-cyan-400 uppercase">
            New Operator
          </h1>
          <h2 className="text-xs text-slate-400 uppercase tracking-widest">
            All Fields Required
          </h2>
        </div>

        {/* Input: Call Sign */}
        <div className="space-y-1">
          <FildsInput
            label="CALL SIGN"
            placeholder="e.g. Vortex_07"
            value={callSign}
            onChange={setCallSign}
            erro={erros.callsign}
          />
          <h4 className="text-[10px] text-slate-500 uppercase tracking-wide">
            3-20 characters: letters, numbers, _ and -
          </h4>
        </div>

        {/* Input: Email */}
        <FildsInput
          label="Email"
          type="email"
          placeholder="e.g. john.doe@example.com"
          value={email}
          onChange={setEmail}
          erro={erros.email}
        />

        {/* Input: Password */}
        <div className="space-y-1">
          <FildsInput
            label="Password"
            type="password"
            placeholder="e.g. ••••••••"
            value={password}
            onChange={setPassword}
            erro={erros.password}
          />
          {/* Estrutura Visual do Medidor de Força */}
          {password && (
            <div className="space-y-1.5 animate-fadeIn">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                <span className="text-slate-500">Security Level:</span>
                <span
                  className={`
          ${passwordStrength === "Weak" && "text-rose-500"}
          ${passwordStrength === "Fair" && "text-amber-500"}
          ${passwordStrength === "Good" && "text-lime-500"}
          ${passwordStrength === "Strong" && "text-emerald-400"}
        `}
                >
                  {passwordStrength}
                </span>
              </div>

              {/* Linha indicadora segmentada */}
              <div className="grid grid-cols-4 gap-1 h-1 w-full bg-slate-950 rounded overflow-hidden">
                <div
                  className={`h-full transition-colors duration-300 ${password ? (passwordStrength === "Weak" ? "bg-rose-500" : passwordStrength === "Fair" ? "bg-amber-500" : passwordStrength === "Good" ? "bg-lime-500" : "bg-emerald-400") : "bg-transparent"}`}
                />
                <div
                  className={`h-full transition-colors duration-300 ${password && passwordStrength !== "Weak" ? (passwordStrength === "Fair" ? "bg-amber-500" : passwordStrength === "Good" ? "bg-lime-500" : "bg-emerald-400") : "bg-slate-900"}`}
                />
                <div
                  className={`h-full transition-colors duration-300 ${password && (passwordStrength === "Good" || passwordStrength === "Strong") ? (passwordStrength === "Good" ? "bg-lime-500" : "bg-emerald-400") : "bg-slate-900"}`}
                />
                <div
                  className={`h-full transition-colors duration-300 ${password && passwordStrength === "Strong" ? "bg-emerald-400" : "bg-slate-900"}`}
                />
              </div>
            </div>
          )}
          <h4 className="text-[10px] text-slate-500 uppercase tracking-wide">
            At least 8 characters
          </h4>
        </div>

        {/* Componente Checkbox */}
        <div className="pt-2">
          <Checkbox
            label="I accept the Terms of Service and Privacy Policy"
            checked={termsAccepted}
            onChange={() => setTermsAccepted((accepted) => !accepted)}
            erro={erros.acceptTerms}
          />
        </div>

        {/* Componente Button */}
        <div className="pt-2">
          <Button
            texto="Initialize Account"
            disabled={!termsAccepted}
            onClick={() => void 0}
            variant="primary"
          />
        </div>

        <h5 className="text-center text-xs text-slate-500 pt-2">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-cyan-400 hover:underline transition-all"
          >
            Login
          </a>
        </h5>
      </form>
    </div>
  );
}

export default App;
