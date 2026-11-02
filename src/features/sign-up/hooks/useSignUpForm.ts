// src/features/sign-up/hooks/useSignUpForm.ts
import { useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";

// Linha 3: Adicionando 'type' antes das suas interfaces
import type {
  FormValues,
  FormErrors,
  PasswordStrengthStatus,
  PasswordStrengthLevel,
} from "../../../types/sign-up";

const initialValues: FormValues = {
  callsign: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

export const useSignUpForm = (onSuccessCallback: () => void) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  // Rastreia quais campos o usuário já interagiu e saíram do foco (onBlur)
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Calcula a força da senha baseado nas regras estritas do briefing.
   */
  const calculatePasswordStrength = (
    password: string,
  ): PasswordStrengthStatus => {
    if (!password) return { score: 0, level: "" };
    if (password.length < 8) return { score: 1, level: "Weak" };

    let score = 0;

    // Regra 1: 8 ou mais caracteres
    if (password.length >= 8) score += 1;
    // Regra 2: 12 ou mais caracteres
    if (password.length >= 12) score += 1;
    // Regra 3: Letras maiúsculas e minúsculas
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    // Regra 4: Contém número
    if (/[0-9]/.test(password)) score += 1;
    // Regra 5: Contém símbolo especial
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Cap do score em 4 conforme o enunciado do desafio
    const finalScore = Math.min(score, 4);

    const levels: Record<number, PasswordStrengthLevel> = {
      1: "Weak",
      2: "Fair",
      3: "Good",
      4: "Strong",
    };

    return {
      score: finalScore,
      level: levels[finalScore] || "Weak",
    };
  };

  const passwordStrength = calculatePasswordStrength(values.password);

  /**
   * Executa a validação individual de um campo isolado.
   */
  const validateField = (
    name: keyof FormValues,
    value: any,
    currentValues: FormValues,
  ): string => {
    switch (name) {
      case "callsign": {
        const trimmed = String(value).trim();
        if (!trimmed) return "Callsign is required";
        if (trimmed.length < 3) return "Must be at least 3 characters";
        if (trimmed.length > 20) return "Must be less than 20 characters";
        // Permite apenas letras, números, underscores e hífens
        if (!/^[A-Za-z0-9_-]+$/.test(trimmed))
          return "Only letters, numbers, _ or - allowed";
        return "";
      }
      case "email": {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";
      }
      case "password": {
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        return "";
      }
      case "confirmPassword": {
        if (!value) return "Please confirm your password";
        if (value !== currentValues.password) return "Passwords do not match";
        return "";
      }
      case "acceptTerms": {
        if (!value) return "You must accept the terms";
        return "";
      }
      default:
        return "";
    }
  };

  /**
   * Gerencia mudanças dinâmicas nos inputs (onChange).
   * Conforme o briefing: "Uma vez checado, ele re-checa a cada keystroke".
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldName = name as keyof FormValues;
    const fieldValue = type === "checkbox" ? checked : value;

    const updatedValues = {
      ...values,
      [fieldName]: fieldValue,
    };

    setValues(updatedValues);

    // Se o campo já foi tocado (onBlur realizado anteriormente), revalida a cada caractere digitado
    if (touched[fieldName] && fieldName !== "acceptTerms") {
      const fieldError = validateField(fieldName, fieldValue, updatedValues);
      setErrors((prev) => ({ ...prev, [fieldName]: fieldError || undefined }));
    }

    // Regra do Briefing: "Digitar na senha re-checa o campo de confirmação, se este já foi checado"
    if (fieldName === "password" && touched.confirmPassword) {
      const confirmError = validateField(
        "confirmPassword",
        updatedValues.confirmPassword,
        updatedValues,
      );
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError || undefined,
      }));
    }

    // Regra do Briefing: "Erro dos termos limpa assim que o checkbox muda"
    if (fieldName === "acceptTerms") {
      if (fieldValue) {
        setErrors((prev) => ({ ...prev, acceptTerms: undefined }));
      }
    }
  };

  /**
   * Disparado quando o campo perde o foco (onBlur).
   * Conforme o briefing: "O campo é checado quando perde o foco com algo digitado".
   */
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldName = name as keyof FormValues;
    const fieldValue = type === "checkbox" ? checked : value;

    // Regra do Briefing: "Deixar um campo que nunca foi preenchido não mostra nada (vazio)"
    if (!fieldValue && fieldName !== "acceptTerms") return;

    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const fieldError = validateField(fieldName, fieldValue, values);
    setErrors((prev) => ({ ...prev, [fieldName]: fieldError || undefined }));
  };

  /**
   * Controla a submissão final do formulário.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Valida absolutamente todos os campos na tentativa de submissão
    const validationErrors: FormErrors = {};
    (Object.keys(values) as Array<keyof FormValues>).forEach((key) => {
      const error = validateField(key, values[key], values);
      if (error) validationErrors[key] = error;
    });

    const totalErrors = Object.keys(validationErrors).length;

    if (totalErrors > 0) {
      setErrors(validationErrors);

      // Marca todos como tocados para expor os erros visualmente
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {},
      );
      setTouched(allTouched);

      // Acessibilidade: Move o foco para o primeiro input inválido e anuncia
      const firstInvalidField = Object.keys(validationErrors)[0];
      const element = document.getElementsByName(firstInvalidField)[0];
      if (element) element.focus();

      alert(`${totalErrors} fields need attention.`); // Substitua por um aria-live announcement na interface real
      return;
    }

    // Formulário Válido - Inicia estado de transmissão simulação assíncrona
    setIsSubmitting(true);

    // Simula o delay de rede "Transmitting_" solicitado no briefing antes do sucesso
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccessCallback();
    }, 2000);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    passwordStrength,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
