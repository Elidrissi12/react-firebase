import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './src/services/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.length >= 6;

  const onLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // ✅ si succès : l'utilisateur est connecté (on gère la redirection après)
    } catch (e: any) {
      setError(mapFirebaseAuthError(e?.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe (min 6)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <Pressable
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        onPress={onLogin}
        disabled={!canSubmit || loading}
      >
        {loading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Se connecter</Text>}
      </Pressable>

      <Link href="/register" asChild>
        <Pressable disabled={loading}>
          <Text style={styles.link}>Créer un compte</Text>
        </Pressable>
      </Link>

      <Text style={styles.hint}>
        Astuce : active “Email/Password” dans Firebase Auth (Sign-in method).
      </Text>
    </View>
  );
}

function mapFirebaseAuthError(code?: string) {
  switch (code) {
    case 'auth/invalid-email':
      return "Email invalide.";
    case 'auth/user-not-found':
      return "Aucun compte avec cet email.";
    case 'auth/wrong-password':
      return "Mot de passe incorrect.";
    case 'auth/email-already-in-use':
      return "Email déjà utilisé.";
    case 'auth/weak-password':
      return "Mot de passe trop faible (min 6).";
    case 'auth/network-request-failed':
      return "Problème réseau. Vérifie ta connexion.";
    default:
      return "Erreur de connexion. Réessaie.";
  }
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 18 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 12, marginBottom: 12,
  },
  button: {
    paddingVertical: 12, borderRadius: 12, alignItems: 'center',
    backgroundColor: '#111827', marginTop: 4,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: '#fff', fontWeight: '700' },
  link: { marginTop: 14, color: '#0a7ea4', fontWeight: '600' },
  error: { color: '#d32f2f', marginBottom: 8 },
  hint: { marginTop: 16, color: '#6b7280', fontSize: 12 },
});