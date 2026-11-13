// src/App.tsx
import { Button } from "./components/Button";
import { FildsInput } from "./components/FildsInput";
import { Checkbox } from "./components/Checkbox";
import { useSignUpForm } from "./features/sign-up/hooks/useSignUpForm";
import { PasswordMeter } from "./features/sign-up/components/PasswordMeter";
import { OperatorStatus } from "./features/sign-up/components/OperatorStatus";

function App() {
  const {
    values,
    touched,
    errors,
    passwordStrength,
    isSubmitting,
    isSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useSignUpForm();

  const validations = {
    callsign: /^[a-zA-Z0-9_-]{3,20}$/.test(values.callsign.trim()),
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email),
    password: values.password.length >= 8,
    confirmation:
      values.password.length >= 8 && values.password === values.confirmPassword,
    terms: values.terms,
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-nexus-bg text-slate-200 font-mono flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-nexus-card border border-nexus-border p-8 text-center relative">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-nexus-accent -mt-[1px] -ml-[1px]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-nexus-accent -mb-[1px] -mr-[1px]" />
          <h1 className="text-2xl font-black text-nexus-strong uppercase mb-4">
            // REGISTRATION COMPLETE
          </h1>
          <p className="text-xs text-nexus-muted uppercase">
            Welcome to the NEONCORE network, Operator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nexus-bg text-slate-200 font-mono flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl grid md:grid-cols-12 gap-8 items-center">
        {/* COLUNA ESQUERDA */}
        <OperatorStatus callsign={values.callsign} validations={validations} />

        {/* COLUNA DIREITA: Formulário */}
        <div className="md:col-span-7 relative bg-nexus-card border border-nexus-border p-8 shadow-2xl">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-nexus-accent -mt-[1px] -ml-[1px]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-nexus-accent -mb-[1px] -mr-[1px]" />

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="flex justify-between items-center border-b border-nexus-border pb-4 mb-2 text-left">
              <h2 className="text-sm font-bold tracking-wider text-slate-300 uppercase">
                New Operator
              </h2>
              <span className="text-[10px] text-nexus-muted uppercase tracking-widest">
                All Fields Required
              </span>
            </div>

            <FildsInput
              label="CALLSIGN"
              name="callsign"
              placeholder="e.g. Vortex_07"
              value={values.callsign}
              onChange={handleChange}
              onBlur={handleBlur}
              erro={errors.callsign}
              sucesso={validations.callsign && touched.callsign}
            />

            <FildsInput
              label="EMAIL"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              erro={errors.email}
              sucesso={validations.email && touched.email}
            />

            <div className="space-y-2">
              <FildsInput
                label="PASSWORD"
                name="password"
                type="password"
                placeholder="••••••••"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                erro={errors.password}
                sucesso={validations.password && touched.password}
              />

              <PasswordMeter
                password={values.password}
                strength={passwordStrength}
              />
            </div>

            <FildsInput
              label="CONFIRM PASSWORD"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              erro={errors.confirmPassword}
              sucesso={validations.confirmation && touched.confirmPassword}
            />

            <Checkbox
              label="I accept the NEONCORE Terms of Service and Privacy Policy"
              name="terms"
              checked={values.terms}
              onChange={handleChange}
              erro={errors.terms}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Transmitting_" : "Submit Operator"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
