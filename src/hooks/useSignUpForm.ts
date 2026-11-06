// src/hooks/useSignUpForm.ts
import { useState } from "react";
import type { FormErrors, FormValues } from "../types/sign-up"; // Importando os tipos criados

export function useSignUpForm() {
  const [callSign, setCallSign] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [erros, setErros] = useState<FormErrors>({});

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

  // Retorna os estados e as funções para o componente usar
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
    lidarComEnvio,
  };
}
