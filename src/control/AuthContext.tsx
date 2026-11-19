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
        
        // Ao abrir o app, busca a foto local salva para este usuário
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
        Alert.alert('Erro', 'Falha na autenticação. Verifique os dados e tente novamente.');
        return false;
      }

      // Busca a foto salva localmente para este usuário específico
      const fotoLocalSalva = await AsyncStorage.getItem(`@ConectaSocial:foto_${data.user.id}`);

      const loggedUser: User = {
        id: Number(data.user.id),
        nome: data.user.nome,
        email: data.user.email,
        role: data.user.role,
        // Se ele já tinha uma foto salva localmente, ela é carregada. Senão, fica nula.
        fotoUrl: fotoLocalSalva || null, 
      };

      await AsyncStorage.setItem('@ConectaSocial:token', data.token);
      await AsyncStorage.setItem('@ConectaSocial:userData', JSON.stringify(loggedUser));

      setUser(loggedUser);
      return true;

    } catch (e: any) {
      console.log('--- ERRO NO LOGIN ---');
      
      let mensagemErro = 'Não foi possível conectar ao servidor.';
      if (e.response) {
        mensagemErro = e.response.data?.message 
                    || e.response.data?.erro 
                    || e.response.data?.error
                    || `Erro ${e.response.status}: Verifique os dados informados.`;
      } else if (e.request) {
        mensagemErro = 'Servidor não respondeu. Verifique sua conexão ou se a API está online.';
      } else {
        mensagemErro = e.message;
      }

      Alert.alert('Falha no Login', mensagemErro);
      return false;

    } finally {
      setLoading(false);
    }
  };

  // --- FUNÇÃO PARA SALVAR A FOTO LOCALMENTE ---
  const atualizarFotoContexto = async (novaFotoUrl: string) => {
    if (user) {
      const usuarioAtualizado = { ...user, fotoUrl: novaFotoUrl };
      setUser(usuarioAtualizado);
      
      // 1. Atualiza os dados do usuário (mantém o AsyncStorage do userData sincronizado)
      await AsyncStorage.setItem('@ConectaSocial:userData', JSON.stringify(usuarioAtualizado));
      
      // 2. Salva o caminho da imagem separadamente usando o ID do usuário
      await AsyncStorage.setItem(`@ConectaSocial:foto_${user.id}`, novaFotoUrl);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('@ConectaSocial:token');
      await AsyncStorage.removeItem('@ConectaSocial:userData');
      // Não removemos a foto do usuário no logout para que, se ele logar novamente, a foto esteja lá
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