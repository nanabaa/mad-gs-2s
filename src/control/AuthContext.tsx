import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';

type User = {
  id: number;
  nome: string;
  email: string;
  role: string; 
  fotoUrl?: string | null; 
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => Promise<void>;
  atualizarFotoContexto: (novaFotoUrl: string) => Promise<void>; 
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
      
      if (token && userData) {
        const parsedUser: User = JSON.parse(userData);
        
        // Garante que ao abrir o app, a foto salva seja carregada
        const fotoLocal = await AsyncStorage.getItem(`@ConectaSocial:foto_${parsedUser.id}`);
        if (fotoLocal) {
          parsedUser.fotoUrl = fotoLocal;
        }
        
        setUser(parsedUser);
      }
    } catch (e) {
      console.log('Erro ao carregar usuário salvo:', e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, senha: string): Promise<boolean> => {
    setLoading(true);

    try {
      const data = await authService.login(email, senha);

      if (!data?.token || !data?.user) {
        Alert.alert('Erro', 'Falha na autenticação.');
        return false;
      }

      // ⚠️ AQUI ESTAVA O ERRO: Buscamos a foto ANTES de montar o objeto final
      const fotoLocalSalva = await AsyncStorage.getItem(`@ConectaSocial:foto_${data.user.id}`);

      const loggedUser: User = {
        id: Number(data.user.id),
        nome: data.user.nome,
        email: data.user.email,
        role: data.user.role,
        fotoUrl: fotoLocalSalva || null, // Prioriza a foto local
      };

      await AsyncStorage.setItem('@ConectaSocial:token', data.token);
      await AsyncStorage.setItem('@ConectaSocial:userData', JSON.stringify(loggedUser));

      setUser(loggedUser);
      return true;

    } catch (e: any) {
      let mensagemErro = 'Não foi possível conectar ao servidor.';
      if (e.response) {
        mensagemErro = e.response.data?.message || e.response.data?.erro || `Erro ${e.response.status}`;
      } else if (e.request) {
        mensagemErro = 'Servidor não respondeu.';
      } else {
        mensagemErro = e.message;
      }
      Alert.alert('Falha no Login', mensagemErro);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const atualizarFotoContexto = async (novaFotoUrl: string) => {
    if (user) {
      const usuarioAtualizado = { ...user, fotoUrl: novaFotoUrl };
      setUser(usuarioAtualizado);
      
      await AsyncStorage.setItem('@ConectaSocial:userData', JSON.stringify(usuarioAtualizado));
      await AsyncStorage.setItem(`@ConectaSocial:foto_${user.id}`, novaFotoUrl);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('@ConectaSocial:token');
      await AsyncStorage.removeItem('@ConectaSocial:userData');
      // A foto NÃO é removida aqui
      setUser(null);
    } catch (e) {
      console.log('Erro ao fazer logout:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, atualizarFotoContexto }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);