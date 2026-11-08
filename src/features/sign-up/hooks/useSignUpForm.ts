// src/hooks/useSignUpForm.ts
import { useState, useEffect } from "react";
import type {
  FormErrors,
  FormValues,
  PasswordStrengthLevel,
} from "../../../types/sign-up";

export function useSignUpForm() {
  const [callSign, setCallSign] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [erros, setErros] = useState<FormErrors>({});

  // Novo estado para controlar a força da senha
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrengthLevel>("Weak");

  // Monitora a senha para recalcular a força a cada caractere digitado
  useEffect(() => {
    if (!password) {
      setPasswordStrength("Weak");
      return;
    }

    let score = 0;

    // Critérios de avaliação tática
    if (password.length >= 8) score++; // Comprimento mínimo
    if (/[A-Z]/.test(password)) score++; // Letra maiúscula
    if (/[0-9]/.test(password)) score++; // Número
    if (/[^A-Za-z0-9]/.test(password)) score++; // Caractere especial (@, #, $, etc.)

    // Mapeamento do score para os níveis definidos na sua interface de tipos
    if (score <= 1) {
      setPasswordStrength("Weak");
    } else if (score === 2) {
      setPasswordStrength("Fair");
    } else if (score === 3) {
      setPasswordStrength("Good");
    } else if (score === 4) {
      setPasswordStrength("Strong");
    }
  }, [password]);

  const validarFormulario = (): boolean => {
    const novosErros: FormErrors = {};

    // 1. Validação do Call Sign
    const regexCallSign = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!callSign) {
      novosErros.callsign = "REQUIRED";
    } else if (!regexCallSign.test(callSign)) {
      novosErros.callsign = "INVALID FORMAT";
    }

    // 2. Validação do Email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      novosErros.email = "REQUIRED";
    } else if (!regexEmail.test(email)) {
      novosErros.email = "MALFORMED";
    }

    // 3. Validação da Senha
    if (!password) {
      novosErros.password = "REQUIRED";
    } else if (password.length < 8) {
      novosErros.password = "TOO SHORT";
    }

    // 4. Validação da Confirmação de Senha
    if (!confirmPassword) {
      novosErros.confirmPassword = "REQUIRED";
    } else if (password !== confirmPassword) {
      novosErros.confirmPassword = "MISMATCH";
    }

    // 5. Validação dos Termos
    if (!termsAccepted) {
      novosErros.acceptTerms = "REQUIRED";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const lidarComEnvio = (event: React.FormEvent) => {
    event.preventDefault();
    if (validarFormulario()) {
      const dadosFinais: FormValues = {
        callsign: callSign,
        email,
        password,
        confirmPassword,
        acceptTerms: termsAccepted,
      };
      console.log("Transmission Successful:", dadosFinais);
      alert("OPERATOR INITIALIZED SUCCESSFULLY");
    }
  };

  return {
    callSign,
    setCallSign,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword, // Retornado
    termsAccepted,
    setTermsAccepted,
    erros,
    passwordStrength,
    lidarComEnvio,
  };
}
