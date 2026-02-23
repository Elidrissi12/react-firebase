import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './src/services/firebase';
import { mapFirebaseAuthError } from './src/utils/authErrors';

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    name.trim().length > 0 && email.trim().length > 0 && password.length >= 6;

  const onRegister = async () => {
    setError(null);
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (cred.user && name.trim().length > 0) {
        await updateProfile(cred.user, { displayName: name.trim() });
      }
    } catch (e: any) {
      setError(mapFirebaseAuthError(e?.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/1771848954052-019c8a6d-2cc0-7e8f-bbeb-51e5bebd7019.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.page}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerRow}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>{'‹'}</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Sign up</Text>
          </View>

          <Text style={styles.subtitle}>Sign up with one of the following</Text>

          <View style={styles.socialRow}>
          <Pressable style={styles.socialButton}>
            <AntDesign name="google" size={18} color="#DB4437" />
            <Text style={styles.socialText}> | With Google</Text>
          </Pressable>
        
          <Pressable style={styles.socialButton}>
            <Ionicons name="logo-apple" size={18} color="#111" />
            <Text style={styles.socialText}> | With Apple</Text>
          </Pressable>
          </View>

          <View style={styles.form}>
          <Text style={styles.label}>Name*</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email*</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password*</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error && <Text style={styles.error}>{error}</Text>}
        </View>

        <Pressable
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          onPress={onRegister}
          disabled={!canSubmit || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign up</Text>
          )}
        </Pressable>

        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <Pressable onPress={() => router.replace('/login')} disabled={loading}>
            <Text style={styles.bottomLink}> Log in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backIcon: {
    fontSize: 32,
    color: '#111827',
    lineHeight: 40,
    includeFontPadding: false,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 40,
    includeFontPadding: false,
  },
  subtitle: { fontSize: 13, color: '#6b7280', marginBottom: 16 },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  socialButton: {
  flex: 1,
  flexDirection: 'row',   
  justifyContent: 'center',
  alignItems: 'center',
  gap: 6,                 
  borderRadius: 999,
  borderWidth: 1,
  borderColor: '#e5e7eb',
  paddingVertical: 20,
  backgroundColor: '#F9FAFB',
},
  socialText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#505c73',
  },
  
  form: {
    marginBottom: 26,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#F9FAFF',
  },
  button: {
    marginTop: 100,
    paddingVertical: 14,
    borderRadius:999,
    alignItems: 'center',
    backgroundColor: '#2563EB',
  },
  buttonDisabled: { opacity: 0.9 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  error: { color: '#dc2626', marginTop: 8, fontSize: 12 },
  bottomRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 12,
    color: '#6b7280',
  },
  bottomLink: {
    fontSize: 12,
    color: '#0652f5',
    fontWeight: '600',
  },
});

