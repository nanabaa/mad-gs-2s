import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
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

    try {
      setIsUploading(true);
      await atualizarFotoContexto(result.assets[0].uri);
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
      
      {}
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
                  <Text style={[styles.fileButtonText, { backgroundColor: colors.background, color: colors.text }]}>
                    Escolher arquivo
                  </Text>
                  <Text style={[styles.fileText, { color: colors.textSecondary }]} numberOfLines={2}>
                    Nenhum arquivo escolhido
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={[styles.hintText, { color: colors.textSecondary }]}>
              Formatos aceitos: JPG, PNG e WebP. Tamanho máximo: 2 MB.
            </Text>
          </View>
        </View>
      </View>

      {}
      <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Informações de Contato</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>Seus dados cadastrais atuais.</Text>
        
        <View style={[styles.roleTag, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.roleText, { color: colors.primary }]}>{user?.role || 'VOLUNTARIO'}</Text>
        </View>

        <View style={[styles.infoContainer, { borderColor: colors.border, backgroundColor: colors.background }]}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Nome completo</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>{user?.nome || 'Não informado'}</Text>
        </View>

        <View style={[styles.infoContainer, { borderColor: colors.border, backgroundColor: colors.background }]}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>E-mail</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>{user?.email || 'Não informado'}</Text>
        </View>

        {}
        <TouchableOpacity 
          style={[styles.sobreButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Sobre')}
        >
          <Text style={styles.sobreButtonText}>Sobre o App</Text>
        </TouchableOpacity>

        {}
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.border }]} 
          onPress={logout}
        >
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
  fileButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8, padding: 8, marginBottom: 8, minHeight: 40, width: '100%' },
  fileButtonText: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 4, fontSize: 12, marginRight: 8, flexShrink: 0 },
  fileText: { fontSize: 12, flex: 1, flexWrap: 'wrap' },
  hintText: { fontSize: 12, marginBottom: 12 },
  
  roleTag: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 16 },
  roleText: { fontSize: 12, fontWeight: 'bold', letterSpacing: 0.5 },
  
  infoContainer: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
  infoLabel: { fontSize: 12, fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase' },
  infoValue: { fontSize: 16, fontWeight: '500' },

  sobreButton: { 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 12,
  },
  sobreButtonText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },

  logoutButton: { 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 12, 
  },
  logoutText: { 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});