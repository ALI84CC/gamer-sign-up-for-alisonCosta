/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Mapeamento dos tons Neutros (Dark theme do NEONCORE)
        neutral: {
          50: "hsl(204 60% 97%)",
          100: "hsl(208 49% 92%)",
          300: "hsl(211 18% 68%)",
          400: "hsl(211 13% 55%)",
          500: "hsl(211 14% 50%)",
          600: "hsl(210 18% 42%)",
          700: "hsl(211 22% 24%)",
          800: "hsl(211 30% 13%)",
          900: "hsl(210 39% 7%)",
          950: "hsl(214 37% 4%)",
        },
        // Elementos de iluminação Neon e Alertas
        lime: {
          500: "hsl(77 90% 59%)", // Verde principal de sucesso/foco
          700: "hsl(77 67% 39%)",
        },
        red: {
          400: "hsl(4 100% 74%)", // Alerta de Erro
        },
        amber: {
          400: "hsl(40 100% 65%)", // Alerta Intermediário (Senha Fair/Good)
        },
        navy: {
          950: "hsl(214 60% 2%)", // Fundo Profundo secundário
        },
        // Cores transparentes customizadas informadas no Style Guide
        alpha: {
          "lime-60": "hsl(77 90% 59% / 0.6)",
          "lime-40": "hsl(77 90% 59% / 0.4)",
          "navy-80": "hsl(214 60% 2% / 0.8)",
          "navy-60": "hsl(214 60% 2% / 0.6)",
        },
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        none: "0px", // Força cantos retos em todo o projeto conforme diretriz
      },
    },
  },
  plugins: [],
};
