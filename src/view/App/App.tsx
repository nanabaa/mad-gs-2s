import React from 'react';
import { View, ActivityIndicator, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Contextos
import { AuthProvider, useAuth } from '../../control/AuthContext';
import { ThemeProvider, useTheme } from '../../control/ThemeContext';

// Telas
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
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 1000 * 60 * 5 } },
});

// --- COMPONENTE DO HEADER PERSONALIZADO ---
function HeaderLogo() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[
      styles.headerContainer, 
      { paddingTop: insets.top + 10, backgroundColor: colors.header, borderBottomColor: colors.border }
    ]}>
      <Image 
        source={require('../../../assets/Logo.png')} // ⚠️ Ajuste o caminho se necessário
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

// --- COMPONENTE DE NAVEGAÇÃO POR ABAS (LOGADO) ---
function MainTabs() {
  const insets = useSafeAreaInsets(); 
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <HeaderLogo />, 
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 70 + insets.bottom, 
          paddingBottom: 10 + insets.bottom, 
          paddingTop: 10,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Início', tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text> }} />
      <Tab.Screen name="Explorar" component={ExplorarScreen} options={{ tabBarLabel: 'Explorar', tabBarIcon: () => <Text style={{ fontSize: 20 }}>🔍</Text> }} />
      <Tab.Screen name="Atividades" component={MinhasAtividadesScreen} options={{ tabBarLabel: 'Atividades', tabBarIcon: () => <Text style={{ fontSize: 20 }}>📋</Text> }} />
      <Tab.Screen name="Perfil" component={PerfilScreen} options={{ tabBarLabel: 'Perfil', tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text> }} />
    </Tab.Navigator>
  );
}

// --- COMPONENTE PRINCIPAL DE NAVEGAÇÃO ---
function AppNavigator() {
  const { user, loading } = useAuth();
  const { colors } = useTheme();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const navTheme = {
    ...DefaultTheme,
    colors: { 
      ...DefaultTheme.colors, 
      background: colors.background, 
      card: colors.card, 
      text: colors.text, 
      border: colors.border, 
      primary: colors.primary 
    }
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ header: () => <HeaderLogo /> }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
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

// --- COMPONENTE RAIZ ---
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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

// --- ESTILOS DO HEADER (Declarado apenas UMA vez) ---
const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  logo: {
    width: 120, 
    height: 40,
  }
});