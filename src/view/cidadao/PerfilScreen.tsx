// src/view/cidadao/PerfilScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../control/AuthContext'; 
import { useTheme } from '../../control/ThemeContext';

export default function PerfilScreen() {
  const { user, logout, atualizarFotoContexto } = useAuth();
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [isUploading, setIsUploading] = useState(false);

  const handleEscolherFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de acesso à sua galeria para alterar a foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled) return;

    const uriSelecionada = result.assets[0].uri;
    
    try {
      setIsUploading(true);
      await atualizarFotoContexto(uriSelecionada);
      Alert.alert('Sucesso', 'Foto de perfil atualizada!');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível salvar a imagem.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      
      {/* Foto de Perfil */}
      <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Foto de perfil</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>Adicione uma foto para que as pessoas possam reconhecer você.</Text>
        
        <View style={styles.photoRow}>
          {user?.fotoUrl ? (
            <Image source={{ uri: user.fotoUrl }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Text style={{ fontSize: 40 }}>👤</Text>
            </View>
          )}

          <View style={styles.photoActions}>
            <Text style={[styles.label, { color: colors.text }]}>Escolher uma imagem</Text>
            
            <TouchableOpacity 
              style={[styles.fileButton, { borderColor: colors.border }]} 
              onPress={handleEscolherFoto}
              disabled={isUploading}
            >
              {isUploading ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                <>
                  <Text style={[styles.fileButtonText, { backgroundColor: colors.background, color: colors.text }]}>Escolher arquivo</Text>
                  <Text style={[styles.fileText, { color: colors.textSecondary }]}>Nenhum arquivo escolhido</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={[styles.hintText, { color: colors.textSecondary }]}>Formatos aceitos: JPG, PNG e WebP. Tamanho máximo: 2 MB.</Text>
          </View>
        </View>
      </View>

      {/* Dados Pessoais */}
      <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Dados pessoais</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>Mantenha suas informações atualizadas.</Text>
        
        <View style={[styles.roleTag, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.roleText, { color: colors.primary }]}>{user?.role || 'VOLUNTARIO'}</Text>
        </View>

        <Text style={[styles.inputLabel, { color: colors.text }]}>Nome completo</Text>
        <TextInput style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.background }]} value={user?.nome || ''} editable={false} />

        <Text style={[styles.inputLabel, { color: colors.text }]}>E-mail</Text>
        <TextInput style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.background }]} value={user?.email || ''} editable={false} />

        <Text style={[styles.inputLabel, { color: colors.text }]}>Telefone</Text>
        <TextInput style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.background }]} placeholder="(11) 99999-9999" placeholderTextColor={colors.textSecondary} />

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]}>
          <Text style={styles.saveButtonText}>Salvar alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sobreButton, { borderColor: colors.primary }]}
          onPress={() => navigation.navigate('Sobre')}
        >
          <Text style={[styles.sobreButtonText, { color: colors.primary }]}>Sobre o App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.logoutButton, { borderColor: colors.border }]} onPress={logout}>
          <Text style={[styles.logoutText, { color: '#E85D2A' }]}>Sair da conta (Logout)</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  sectionCard: { borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  sectionSubtitle: { fontSize: 14, marginBottom: 20 },
  
  photoRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 90, height: 90, borderRadius: 45, marginRight: 16 },
  avatarPlaceholder: { justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  
  photoActions: { flex: 1 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  fileButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8, padding: 8, marginBottom: 8, minHeight: 40 },
  fileButtonText: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 4, fontSize: 12, marginRight: 8 },
  fileText: { fontSize: 12 },
  hintText: { fontSize: 12, marginBottom: 12 },
  
  roleTag: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 16 },
  roleText: { fontSize: 12, fontWeight: 'bold', letterSpacing: 0.5 },
  inputLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 6, marginTop: 8 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 15, marginBottom: 12 },
  
  saveButton: { padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  
  sobreButton: { padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 12, borderWidth: 1 },
  sobreButtonText: { fontWeight: 'bold', fontSize: 16 },

  logoutButton: { padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 12, borderWidth: 1 },
  logoutText: { fontWeight: 'bold', fontSize: 16 }
});