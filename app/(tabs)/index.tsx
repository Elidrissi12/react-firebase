import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';

import { auth } from '../src/services/firebase';

export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Erreur lors de la déconnexion :', e);
    }
  };

  return (
    <View style={styles.page}>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </Pressable>

      <View style={styles.centerContent}>
        <View style={styles.logoCircle}>
          <Ionicons name="trending-up-outline" size={42} color="#2563EB" />
        </View>
        <Text style={styles.brand}>AureliaBank</Text>
      </View>

      <View style={styles.bottomPattern} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#2563EB',
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    zIndex: 10,
  },
  logoutText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  brand: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  bottomPattern: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: '#1D4ED8',
    borderTopLeftRadius: 120,
  },
});
