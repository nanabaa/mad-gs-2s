import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Banner Principal com BG Image */}
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1593113589914-07599018dd2a?q=80&w=1000&auto=format&fit=crop' }} 
        style={styles.heroBanner}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.heroTag}>CONECTANDO BOAS AÇÕES</Text>
          <Text style={styles.heroTitle}>
            Uma conexão pode {'\n'}
            <Text style={styles.heroTitleHighlight}>transformar o mundo.</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Descubra iniciativas, encontre pessoas e faça parte de mudanças reais na sua comunidade.
          </Text>
          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Explorar campanhas →</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Seção de Campanhas em Destaque */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Campanhas em destaque</Text>
        
        {/* Card de Campanha 1 */}
        <View style={styles.campaignCard}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=500&auto=format&fit=crop' }} style={styles.campaignImage} />
          <View style={styles.cardContent}>
            <View style={styles.tagRow}>
              <Text style={styles.tagText}>Alimentação</Text>
              <Text style={styles.verifiedText}>✓ ONG Verificada</Text>
            </View>
            <Text style={styles.campaignTitle}>Arrecadação Solidária de Alimentos</Text>
            <Text style={styles.campaignDesc} numberOfLines={2}>
              Nossa campanha tem como objetivo arrecadar alimentos não perecíveis para ajudar famílias em situação de vulnerabilidade social.
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Conheça essa causa</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card de Campanha 2 */}
        <View style={styles.campaignCard}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=500&auto=format&fit=crop' }} style={styles.campaignImage} />
          <View style={styles.cardContent}>
            <View style={styles.tagRow}>
              <Text style={styles.tagText}>Apoio Social</Text>
              <Text style={styles.verifiedText}>✓ ONG Verificada</Text>
            </View>
            <Text style={styles.campaignTitle}>Doação de roupas para crianças carentes</Text>
            <Text style={styles.campaignDesc} numberOfLines={2}>
              Estamos promovendo uma iniciativa de solidariedade e cidadania com o objetivo de ajudar pessoas em situação de vulnerabilidade social.
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Conheça essa causa</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  heroBanner: { margin: 16, borderRadius: 16, overflow: 'hidden', minHeight: 320 },
  overlay: { flex: 1, backgroundColor: 'rgba(255, 240, 235, 0.9)', padding: 24, justifyContent: 'center' },
  heroTag: { fontSize: 12, fontWeight: 'bold', color: '#8C7A6B', letterSpacing: 1, marginBottom: 10 },
  heroTitle: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', lineHeight: 34 },
  heroTitleHighlight: { color: '#E85D2A' },
  heroSubtitle: { fontSize: 14, color: '#555', marginTop: 12, marginBottom: 20, lineHeight: 20 },
  heroButton: { backgroundColor: '#E85D2A', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignSelf: 'flex-start' },
  heroButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  
  section: { padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  
  campaignCard: { backgroundColor: '#FFF', borderRadius: 16, marginBottom: 20, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  campaignImage: { width: '100%', height: 160 },
  cardContent: { padding: 16 },
  tagRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  tagText: { backgroundColor: '#F0E6E1', color: '#A65D41', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, fontSize: 12, fontWeight: 'bold' },
  verifiedText: { color: '#2E7D32', fontSize: 12, fontWeight: 'bold' },
  campaignTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  campaignDesc: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 16 },
  cardButton: { borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 12 },
  cardButtonText: { color: '#E85D2A', fontWeight: 'bold', fontSize: 14 }
});