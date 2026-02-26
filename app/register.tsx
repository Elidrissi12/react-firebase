import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerClassName="flex-grow px-5 pt-16 pb-8"
            keyboardShouldPersistTaps="handled"
          >
          <View className="flex-row items-center mb-4 min-h-[40px]">
            <Pressable
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              onPress={() => router.back()}
            >
              <Text className="text-3xl text-slate-900">{'‹'}</Text>
            </Pressable>
            <Text className="text-[26px] font-bold text-slate-900">Sign up</Text>
          </View>

          <Text className="text-[13px] text-slate-500 mb-4">
            Sign up with one of the following
          </Text>

          <View className="flex-row gap-3 mb-6">
            <Pressable className="flex-1 flex-row items-center justify-center rounded-full border border-slate-200 bg-slate-50 py-5 gap-1.5">
              <AntDesign name="google" size={18} color="#DB4437" />
              <Text className="text-[13px] font-medium text-slate-900">| With Google</Text>
            </Pressable>

            <Pressable className="flex-1 flex-row items-center justify-center rounded-full border border-slate-200 bg-slate-50 py-5 gap-1.5">
              <Ionicons name="logo-apple" size={18} color="#111" />
              <Text className="text-[13px] font-medium text-slate-900">| With Apple</Text>
            </Pressable>
          </View>

          <View className="mb-4">
            <Text className="text-[13px] font-medium text-slate-700 mb-3 mt-2">Name*</Text>
            <TextInput
              className="border border-slate-200 rounded-xl px-3.5 py-2.5 mb-2 bg-slate-50"
              placeholder="Your name"
              value={name}
              onChangeText={setName}
            />

            <Text className="text-[13px] font-medium text-slate-700 mb-3 mt-2">Email*</Text>
            <TextInput
              className="border border-slate-200 rounded-xl px-3.5 py-2.5 mb-2 bg-slate-50"
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Text className="text-[13px] font-medium text-slate-700 mb-3 mt-2">Password*</Text>
            <TextInput
              className="border border-slate-200 rounded-xl px-3.5 py-2.5 mb-2 bg-slate-50"
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {error && <Text className="text-[12px] text-red-600 mt-2">{error}</Text>}
          </View>

          <Pressable
            className={`mt-10 py-3.5 rounded-full items-center bg-blue-600 ${
              !canSubmit || loading ? 'opacity-60' : ''
            }`}
            onPress={onRegister}
            disabled={!canSubmit || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-[15px]">Sign up</Text>
            )}
          </Pressable>

          <View className="mt-5 flex-row justify-center">
            <Text className="text-[12px] text-slate-600">Already have an account?</Text>
            <Pressable onPress={() => router.replace('/login')} disabled={loading}>
              <Text className="text-[12px] text-blue-600 font-semibold"> Log in</Text>
            </Pressable>
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
