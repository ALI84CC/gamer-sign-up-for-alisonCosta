// src/hooks/useSignUpForm.ts
import { useState, useEffect } from "react";

// Interface que define a estrutura do usuário autenticado
export interface LoggedUser {
  name: string;
  email: string;
}

export function useSignUpForm() {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Verifica se há um usuário logado ao carregar o app
  useEffect(() => {
    const savedUser = localStorage.getItem("shopping_market_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erro ao ler dados de autenticação:", error);
        localStorage.removeItem("shopping_market_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Função para efetuar o login / persistir estado
  const login = (userData: LoggedUser) => {
    localStorage.setItem("shopping_market_user", JSON.stringify(userData));
    setUser(userData);
  };

  // Função para efetuar logout
  const logout = () => {
    localStorage.removeItem("shopping_market_user");
    setUser(null);
  };

  return {
    user,
    isLoggedIn: !!user, // Retorna true se houver um objeto 'user', false se nulo
    isLoading,
    login,
    logout,
  };
}
