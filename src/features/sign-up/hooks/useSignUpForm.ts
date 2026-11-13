import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import { useState } from "react";
import { calculateStrength } from "../utils/calculateStrength";

// Interfaces base do formulário
export interface FormValues {
  callsign: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface FormTouched {
  callsign: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export function useSignUpForm() {
  const [values, setValues] = useState<FormValues>({
    callsign: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [touched, setTouched] = useState<FormTouched>({
    callsign: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Deriva a força da senha em tempo real baseado no valor atual
  const passwordStrength = calculateStrength(values.password);

  // 1. Função pura de validação de um campo específico
  const validateField = (
    name: keyof FormValues,
    currentValues: FormValues,
  ): string => {
    switch (name) {
      case "callsign": {
        const trimmed = currentValues.callsign.trim();
        if (!trimmed) return "Callsign is required";
        if (trimmed.length < 3) return "Callsign must be at least 3 characters";
        if (trimmed.length > 20)
          return "Callsign must be 20 characters or less";

        // Regex: Apenas letras, números, _ ou -
        const validPattern = /^[A-Za-z0-9_-]+$/;
        if (!validPattern.test(trimmed)) {
          return "Only letters, numbers, underscores, and hyphens allowed";
        }
        return "";
      }
      case "email": {
        if (!currentValues.email) return "Email is required";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(currentValues.email)) {
          return "Please enter a valid email address";
        }
        return "";
      }
      case "password": {
        if (!currentValues.password) return "Password is required";
        if (currentValues.password.length < 8) {
          return "Password must be at least 8 characters";
        }
        return "";
      }
      case "confirmPassword": {
        if (!currentValues.confirmPassword)
          return "Please confirm your password";
        if (currentValues.confirmPassword !== currentValues.password) {
          return "Passwords do not match";
        }
        return "";
      }
      case "terms": {
        if (!currentValues.terms)
          return "You must accept the terms and conditions";
        return "";
      }
      default:
        return "";
    }
  };

  // 2. Evento disparado a cada tecla digitada (Keystroke)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldName = name as keyof FormValues;
    const fieldValue = type === "checkbox" ? checked : value;

    const updatedValues = {
      ...values,
      [fieldName]: fieldValue,
    };

    setValues(updatedValues);

    // Regra do Briefing: "Once a field has been checked, it re-checks on every keystroke"
    // Se o campo já foi tocado (ou se for a confirmação da senha e a senha mudou), atualiza o erro na hora
    if (touched[fieldName as keyof FormTouched] || fieldName === "password") {
      const fieldError = validateField(fieldName, updatedValues);

      setErrors((prev) => {
        const next = { ...prev };
        if (fieldError) {
          next[fieldName] = fieldError;
        } else {
          delete next[fieldName];
        }

        // Regra do Briefing: "Typing in the password re-checks the confirm field, if that has already been checked"
        if (fieldName === "password" && touched.confirmPassword) {
          const confirmError = validateField("confirmPassword", updatedValues);
          if (confirmError) next.confirmPassword = confirmError;
          else delete next.confirmPassword;
        }

        return next;
      });
    }
  };

  // 3. Evento disparado quando o usuário sai do campo (Blur)
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof FormTouched;

    // Regra do Briefing: "Leaving a field that was never filled shows nothing"
    if (!values[fieldName]) return;

    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const fieldError = validateField(fieldName, values);
    setErrors((prev) => {
      if (fieldError) return { ...prev, [fieldName]: fieldError };
      const next = { ...prev };
      delete next[fieldName];
      return next;
    });
  };

  // 4. Submissão do Formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // No submit, forçamos a validação de absolutamente todos os campos
    const allFields: (keyof FormValues)[] = [
      "callsign",
      "email",
      "password",
      "confirmPassword",
      "terms",
    ];
    const validationErrors: Record<string, string> = {};

    allFields.forEach((field) => {
      const error = validateField(field, values);
      if (error) {
        validationErrors[field] = error;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Força marcar todos como tocados para que passem a revalidar no keystroke
      setTouched({
        callsign: true,
        email: true,
        password: true,
        confirmPassword: true,
      });

      // Aqui, futuramente interceptaremos com o leitor de telas (Acessibilidade)
      console.log(
        `${Object.keys(validationErrors).length} fields need attention.`,
      );
      return;
    }

    // Formulário válido: Inicia estado "Transmitting_"
    setIsSubmitting(true);
    setErrors({});

    // Simulando atraso de rede ("wait a moment before showing the success message")
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return {
    values,
    touched,
    errors,
    passwordStrength,
    isSubmitting,
    isSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
