// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: "#05080f", // Fundo ultra-dark da tela
          card: "#090f1c", // Fundo do bloco do formulário
          border: "#131e33", // Bordas padrão de escaneamento
          accent: "#c0ff2d", // O Verde-Neon/Lima principal do botão ativo
          muted: "#4b5c75", // Textos secundários / Labels desabilitadas

          // Cores de Feedback de Erros e Força da Senha
          weak: "#ef4444", // Vermelho de falha / Senha Fraca
          fair: "#f59e0b", // Laranja para Senha Regular
          good: "#84cc16", // Amarelo-esverdeado para Senha Boa
          strong: "#10b981", // Verde esmeralda para Senha Forte
        },
      },
      fontFamily: {
        // Fontes mono-espaçadas dão o visual de terminal de dados
        mono: ["JetBrains Mono", "Fira Code", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
