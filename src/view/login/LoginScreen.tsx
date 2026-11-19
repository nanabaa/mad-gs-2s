import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, ActivityIndicator, ImageBackground, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../control/AuthContext';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login, loading } = useAuth();

  const handleLogin = async () => {
    if (!email || !senha) { Alert.alert('Erro', 'Preencha email e senha'); return; }
    const success = await login(email, senha);
    if (!success) Alert.alert('Erro', 'Email ou senha inválidos');
  };

  return (
    <ImageBackground
      source={require('../../../assets/loginBG.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {}
      <View style={styles.overlay} />

      <View style={styles.container}>
        
        {}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/Logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.subtitle}>Conectando pessoas, ONGs e oportunidades para transformar realidades.</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#F9F9F9' }]} 
          onPress={handleLogin} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#E85D2A" /> 
          ) : (
            <Text style={[styles.buttonText, { color: '#E85D2A' }]}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 420, 
    height: 280, 
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFF',
    padding: 14,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#FFF',
    color: '#333',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  linkButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  linkText: {
    color: '#FFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});