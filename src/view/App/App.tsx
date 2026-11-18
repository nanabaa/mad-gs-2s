import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from '../../control/AuthContext';
import { ThemeProvider, useTheme } from '../../control/ThemeContext';

import LoginScreen from '../../view/login/LoginScreen';
import CadastroScreen from '../../view/login/CadastroScreen';

import HomeScreen from '../../view/cidadao/HomeScreen';
import ExplorarScreen from '../../view/cidadao/ExplorarScreen';
import MinhasAtividadesScreen from '../../view/cidadao/MinhasAtividadesScreen';
import PerfilScreen from '../../view/cidadao/PerfilScreen';

import SobreScreen from '../../view/vet/SobreScreen'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient({
  defaultOptions: { 
    queries: { 
      retry: 1, 
      refetchOnWindowFocus: false, 
      staleTime: 1000 * 60 * 5 
    } 
  },
});

function MainTabs() {
  const insets = useSafeAreaInsets(); 

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: '#E85D2A', 
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 1,
          borderTopColor: '#EEE',
          height: 70 + insets.bottom, 
          paddingBottom: 10 + insets.bottom, 
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarLabel: 'Início',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text> 
        }} 
      />
      <Tab.Screen 
        name="Explorar" 
        component={ExplorarScreen} 
        options={{ 
          tabBarLabel: 'Explorar',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🔍</Text> 
        }} 
      />
      <Tab.Screen 
        name="Atividades" 
        component={MinhasAtividadesScreen} 
        options={{ 
          tabBarLabel: 'Atividades',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📋</Text> 
        }} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        options={{ 
          tabBarLabel: 'Perfil',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text> 
        }} 
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { user, loading } = useAuth();
  const { theme, colors } = useTheme();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color="#E85D2A" />
      </View>
    );
  }

  const navTheme = theme === 'dark' ? {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      primary: '#E85D2A',
    }
  } : {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      primary: '#E85D2A',
    }
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Criar Conta', headerBackTitle: 'Voltar' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainApp" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Sobre" component={SobreScreen} options={{ title: 'Sobre o App' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* SafeAreaProvider é necessário para o useSafeAreaInsets funcionar */}
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}