// src/App.tsx
import { useState } from "react";
import { Button } from "./components/Button";
import { FildsInput } from "./components/FildsInput";
import { Checkbox } from "./components/Checkbox";
type FormErrors = {
  callSign?: string;
  email?: string;
  password?: string;
  acceptTerms?: string;
};

type FormValues = {
  callSign: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};
function App() {
  const [callSign, setCallSign] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Estado para armazenar os erros de validação baseado na sua interface FormErrors
  const [erros, setErros] = useState<FormErrors>({});

  const validarFormulario = (): boolean => {
    const novosErros: FormErrors = {};

    // 1. Validação do Call Sign (3-20 caracteres, letras, números, _ e -)
    const regexCallSign = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!callSign) {
      novosErros.callSign = "O campo CALL SIGN é obrigatório.";
    } else if (!regexCallSign.test(callSign)) {
      novosErros.callSign =
        "Use entre 3 e 20 caracteres (letras, números, _ ou -).";
    }

    // 2. Validação do Email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      novosErros.email = "O campo Email é obrigatório.";
    } else if (!regexEmail.test(email)) {
      novosErros.email = "Insira um formato de e-mail válido.";
    }

    // 3. Validação de Senha (mínimo 8 caracteres)
    if (!password) {
      novosErros.password = "A senha é obrigatória.";
    } else if (password.length < 8) {
      novosErros.password = "A senha deve conter pelo menos 8 caracteres.";
    }

    // 4. Validação dos Termos
    if (!termsAccepted) {
      novosErros.acceptTerms = "Você precisa aceitar os termos para continuar.";
    }

    setErros(novosErros);

    // Retorna true se não houver nenhuma propriedade de erro mapeada
    return Object.keys(novosErros).length === 0;
  };

  const lidarComEnvio = (event: React.FormEvent) => {
    event.preventDefault(); // Impede o recarregamento tradicional da página

    if (validarFormulario()) {
      const dadosFinais: FormValues = {
        callSign,
        email,
        password,
        confirmPassword: password, // Mapeado para preencher sua interface de valores
        acceptTerms: termsAccepted,
      };

      console.log(
        "Formulário validado com sucesso! Enviando dados:",
        dadosFinais,
      );
      alert("Cadastro do Operador inicializado com sucesso!");
    }
  };

  return (
    <div className="min-h-screen h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <h1>Meu Projeto Vite + React + TypeScript</h1>

      {/* Usamos a tag nativa form com onSubmit controlado para validações síncronas */}
      <form
        onSubmit={lidarComEnvio}
        noValidate
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-2xl space-y-6"
      >
        <div className="space-y-1 border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold tracking-wider text-cyan-400 uppercase">
            New Operator
          </h1>
          <h2 className="text-xs text-slate-400 uppercase tracking-widest">
            All Fields Required
          </h2>
        </div>
        <div>
          <FildsInput
            name="CallSign"
            type="text"
            placeholder="e.g. Vortex_07"
            label="CALL SIGN"
            value={callSign}
            onChange={(value) => setCallSign(value)}
          />
          <h4>3-20 characters: letters, numbers, _ and -</h4>
          {erros.callSign && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {erros.callSign}
            </span>
          )}
        </div>

        <div>
          <FildsInput
            name="Email"
            type="email"
            placeholder="e.g. john.doe@example.com"
            label="Email"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          {erros.email && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {erros.email}
            </span>
          )}
        </div>

        <div>
          <FildsInput
            name="passw"
            type="password"
            placeholder="e.g. ••••••••"
            label="Password"
            value={password}
            onChange={(value) => setPassword(value)}
          />
          <h4>at least 8 characters</h4>
          {erros.password && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {erros.password}
            </span>
          )}
        </div>

        <div style={{ margin: "15px 0" }}>
          <Checkbox
            label="I accept the Terms of Service and Privacy Policy"
            checked={termsAccepted}
            onChange={() => setTermsAccepted((accepted) => !accepted)}
          />
          {erros.acceptTerms && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {erros.acceptTerms}
            </div>
          )}
        </div>

        <Button
          texto="Initialize Account"
          disabled={!termsAccepted}
          onClick={() => void 0}
          variant="primary"
        />

        <h5>
          Already have an account? <a href="/login">Login</a>
        </h5>
      </form>
    </div>
  );
}

export default App;
