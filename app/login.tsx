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
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './src/services/firebase';
import { mapFirebaseAuthError } from './src/utils/authErrors';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.length >= 6;

  const onLogin = async () => {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (e: any) {
      setError(mapFirebaseAuthError(e?.code));
    } finally {
      setLoading(false);
    }
  };

  const onForgotPassword = async () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Entre ton email pour réinitialiser le mot de passe.");
      return;
    }

    setError(null);
    setInfo(null);
    try {
      await sendPasswordResetEmail(auth, trimmed);
      setInfo('Un email de réinitialisation a été envoyé.');
    } catch (e: any) {
      setError(mapFirebaseAuthError(e?.code));
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
            onPress={() => router.replace('/register')}
          >
            <Text style={styles.backIcon}>{'‹'}</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Log in</Text>
          </View>

          <Text style={styles.subtitle}>Log in with one of the following</Text>

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
            <Text style={styles.label}>Email*</Text>
            <TextInput
              style={styles.input}
              placeholder="zaki@gmail.com"
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

            <View style={styles.rowBetween}>
              <Pressable
                style={styles.rememberRow}
                onPress={() => setRememberMe((prev) => !prev)}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
                <Text style={styles.rememberText}>Remember me</Text>
              </Pressable>

              <Pressable onPress={onForgotPassword}>
                <Text style={styles.forgotText}>Forgot Password</Text>
              </Pressable>
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
            {info && !error && <Text style={styles.info}>{info}</Text>}
          </View>

          <Pressable
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
            onPress={onLogin}
            disabled={!canSubmit || loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Log in</Text>}
          </Pressable>

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>First time here?</Text>
            <Pressable onPress={() => router.push('/register')} disabled={loading}>
              <Text style={styles.bottomLink}> Sign up</Text>
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
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  backIcon: {
    fontSize: 28,
    color: '#111827',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: { fontSize: 13, color: '#6b7280', marginBottom: 16 },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
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
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 8,
    fontSize: 12,
    color: '#9ca3af',
  },
  form: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 14,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#F9FAFF',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#9ca3af',
    marginRight: 6,
    backgroundColor: '#ffffff',
  },
  checkboxChecked: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  rememberText: {
    fontSize: 12,
    color: '#374151',
  },
  forgotText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
  },
  button: {
    marginTop: 170,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    backgroundColor: '#2563EB',
  },
  buttonDisabled: { opacity: 0.9 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  error: { color: '#dc2626', marginTop: 8, fontSize: 12 },
  info: { color: '#16a34a', marginTop: 8, fontSize: 12 },
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
    color: '#2563EB',
    fontWeight: '600',
  },
});