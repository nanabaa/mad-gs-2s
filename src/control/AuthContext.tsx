import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';

type User = {
  id: number;
  nome: string;
  email: string;
  role: string; 
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    carregarUsuarioSalvo(); 
  }, []);

  const carregarUsuarioSalvo = async () => {
    try {
      const token = await AsyncStorage.getItem('@ConectaSocial:token');
      const userData = await AsyncStorage.getItem('@ConectaSocial:userData');
      if (token && userData) setUser(JSON.parse(userData));
    } catch (e) { 
      console.log('Erro ao carregar usuário:', e); 
    } finally { 
      setLoading(false); 
    }
  };

  const login = async (email: string, senha: string): Promise<boolean> => {
    setLoading(true);
    try {
      const data = await authService.login(email, senha);

      console.log('Retorno da API Java:', data);

     
      if (!data?.user) {
        console.log('API não retornou os dados do usuário.');
        return false;
      }

      const loggedUser: User = {
        id: Number(data.user.id),
        nome: data.user.nome,
        email: data.user.email,
        role: data.user.role,
      };

      
      if (data.token) {
        await AsyncStorage.setItem('@ConectaSocial:token', data.token);
      }
      await AsyncStorage.setItem('@ConectaSocial:userData', JSON.stringify(loggedUser));

      setUser(loggedUser);
      return true;

    } catch (e: any) {
      console.log('Erro no login:', e.response?.data || e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('@ConectaSocial:token');
      await AsyncStorage.removeItem('@ConectaSocial:userData');
      setUser(null);
    } catch (e) { 
      console.log('Erro no logout:', e); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);