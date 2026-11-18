// src/view/cidadao/MinhasAtividadesScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MinhasAtividadesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.tag}>SUA JORNADA</Text>
        <Text style={styles.title}>Sua próxima atitude começa aqui.</Text>
        <Text style={styles.subtitle}>
          Explore as campanhas e descubra onde sua participação pode fazer a diferença.
        </Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Perfil voluntário</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', padding: 16, justifyContent: 'center' },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#EEE', elevation: 2 },
  tag: { fontSize: 12, fontWeight: 'bold', color: '#999', letterSpacing: 1, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 12 },
  subtitle: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 24 },
  button: { backgroundColor: '#FFF1EB', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 20, alignSelf: 'flex-start' },
  buttonText: { color: '#E85D2A', fontWeight: 'bold', fontSize: 14 },
});