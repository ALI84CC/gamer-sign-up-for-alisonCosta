export interface FormValues {
  callsign: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface FormErrors {
  callsign?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

/**
 * Tipagem estrita para os quatro estados possíveis do medidor de senha.
 * Usamos um Union Type para garantir que nenhuma string inválida seja aceita.
 */
export type PasswordStrengthLevel = "Weak" | "Fair" | "Good" | "Strong";

export interface PasswordStrengthStatus {
  score: number; // De 0 a 4 (conforme a pontuação do briefing)
  level: PasswordStrengthLevel | ""; // Vazio se o campo estiver limpo
}
