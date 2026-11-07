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

    const regexCallSign = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!callSign) {
      novosErros.callsign = "O campo CALL SIGN é obrigatório.";
    } else if (!regexCallSign.test(callSign)) {
      novosErros.callsign =
        "Use entre 3 e 20 caracteres (letras, números, _ ou -).";
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      novosErros.email = "O campo Email é obrigatório.";
    } else if (!regexEmail.test(email)) {
      novosErros.email = "Insira um formato de e-mail válido.";
    }

    if (!password) {
      novosErros.password = "A senha é obrigatória.";
    } else if (password.length < 8) {
      novosErros.password = "A senha deve conter pelo menos 8 caracteres.";
    }

    if (!termsAccepted) {
      novosErros.acceptTerms = "Você precisa aceitar os termos para continuar.";
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
        confirmPassword: password,
        acceptTerms: termsAccepted,
      };

      console.log("Formulário validado com sucesso! Dados:", dadosFinais);
      alert("Cadastro do Operador inicializado com sucesso!");
    }
  };

  return {
    callSign,
    setCallSign,
    email,
    setEmail,
    password,
    setPassword,
    termsAccepted,
    setTermsAccepted,
    erros,
    passwordStrength, // Retornando o nível calculado para a interface usar
    lidarComEnvio,
  };
}
