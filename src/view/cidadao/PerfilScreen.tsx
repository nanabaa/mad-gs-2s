// src/view/cidadao/PerfilScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useAuth } from '../../control/AuthContext'; // Ajuste o caminho se necessário

export default function PerfilScreen() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Foto de Perfil */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Foto de perfil</Text>
        <Text style={styles.sectionSubtitle}>Adicione uma foto para que as pessoas possam reconhecer você.</Text>
        
        <View style={styles.photoRow}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=47' }} 
            style={styles.avatar} 
          />
          <View style={styles.photoActions}>
            <Text style={styles.label}>Escolher uma imagem</Text>
            <TouchableOpacity style={styles.fileButton}>
              <Text style={styles.fileButtonText}>Escolher arquivo</Text>
              <Text style={styles.fileText}>Nenhum arquivo escolhido</Text>
            </TouchableOpacity>
            <Text style={styles.hintText}>Formatos aceitos: JPG, PNG e WebP. Tamanho máximo: 2 MB.</Text>
            <TouchableOpacity style={styles.updatePhotoButton}>
              <Text style={styles.updatePhotoText}>Atualizar foto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Dados Pessoais */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Dados pessoais</Text>
        <Text style={styles.sectionSubtitle}>Mantenha suas informações atualizadas.</Text>
        
        <View style={styles.roleTag}>
          <Text style={styles.roleText}>VOLUNTARIO</Text>
        </View>

        <Text style={styles.inputLabel}>Nome completo</Text>
        <TextInput 
          style={styles.input} 
          value={user?.nome || 'Nome do Voluntário'} 
          editable={false} // Deixar false por enquanto, ou implementar edição
        />

        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput 
          style={styles.input} 
          value={user?.email || 'email@exemplo.com'} 
          editable={false}
        />

        <Text style={styles.inputLabel}>Telefone</Text>
        <TextInput 
          style={styles.input} 
          placeholder="(11) 99999-9999"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar alterações</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', padding: 16 },
  sectionCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#EEE' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  sectionSubtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  
  photoRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 90, height: 90, borderRadius: 45, marginRight: 16 },
  photoActions: { flex: 1 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  fileButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 8, marginBottom: 8 },
  fileButtonText: { backgroundColor: '#F0F0F0', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 4, fontSize: 12, marginRight: 8, color: '#333' },
  fileText: { color: '#999', fontSize: 12 },
  hintText: { fontSize: 12, color: '#999', marginBottom: 12 },
  updatePhotoButton: { borderWidth: 1, borderColor: '#E85D2A', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, alignSelf: 'flex-start' },
  updatePhotoText: { color: '#E85D2A', fontWeight: 'bold', fontSize: 14 },

  roleTag: { backgroundColor: '#FFF1EB', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 16 },
  roleText: { color: '#E85D2A', fontSize: 12, fontWeight: 'bold', letterSpacing: 0.5 },
  
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 6, marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, fontSize: 15, color: '#333', marginBottom: 12, backgroundColor: '#FAFAFA' },
  
  saveButton: { backgroundColor: '#E85D2A', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});