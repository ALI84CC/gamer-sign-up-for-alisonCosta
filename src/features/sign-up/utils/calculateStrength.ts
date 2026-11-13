export interface StrengthResult {
  score: number; // 0 (vazio) a 4 (Strong)
  label: "Weak" | "Fair" | "Good" | "Strong" | "";
}

export function calculateStrength(password: string): StrengthResult {
  if (!password) {
    return { score: 0, label: "" };
  }

  // Regra absoluta 1: Menos de 8 caracteres é sempre Weak
  if (password.length < 8) {
    return { score: 1, label: "Weak" };
  }

  let points = 1; // Já passou no critério de ter 8+ caracteres

  // Critério: 12 ou mais caracteres
  if (password.length >= 12) {
    points += 1;
  }

  // Critério: Letras maiúsculas E minúsculas
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  if (hasUppercase && hasLowercase) {
    points += 1;
  }

  // Critério: Pelo menos um número
  if (/[0-9]/.test(password)) {
    points += 1;
  }

  // Critério: Pelo menos um símbolo (especial)
  if (/[^A-Za-z0-9]/.test(password)) {
    points += 1;
  }

  // Limita o teto de pontos em 4 (Cap the score at 4)
  const score = Math.min(points, 4) as 1 | 2 | 3 | 4;

  // Mapeamento do score para o Label
  const labels: Record<1 | 2 | 3 | 4, "Weak" | "Fair" | "Good" | "Strong"> = {
    1: "Weak",
    2: "Fair",
    3: "Good",
    4: "Strong",
  };

  return {
    score,
    label: labels[score],
  };
}
