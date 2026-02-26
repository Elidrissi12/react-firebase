import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../app/src/services/firebase";
import { mapFirebaseAuthError } from "../app/src/utils/authErrors";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      setInfo("Un email de réinitialisation a été envoyé.");
    } catch (e: any) {
      setError(mapFirebaseAuthError(e?.code));
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/1771848954052-019c8a6d-2cc0-7e8f-bbeb-51e5bebd7019.png")}
      resizeMode="cover"
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerClassName="flex-grow px-5 pt-16 pb-8"
          >
          <View className="flex-row items-center mb-4">
            <Pressable
              className="w-8 h-8 rounded-full items-center justify-center mr-2"
              onPress={() => router.replace("/register")}
            >
              <Text className="text-[28px] text-gray-900">‹</Text>
            </Pressable>

            <Text className="text-[26px] font-bold text-gray-900">Log in</Text>
          </View>

          <Text className="text-[13px] text-gray-500 mb-4">
            Log in with one of the following
          </Text>

          <View className="flex-row gap-3 mb-7">
            <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-50 py-5">
              <AntDesign name="google" size={18} color="#DB4437" />
              <Text className="text-[13px] font-medium text-gray-900">| With Google</Text>
            </Pressable>

            <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-50 py-5">
              <Ionicons name="logo-apple" size={18} color="#111" />
              <Text className="text-[13px] font-medium text-gray-900">| With Apple</Text>
            </Pressable>
          </View>

          <View className="mb-4">
            <Text className="text-[13px] font-medium text-gray-700 mb-3 mt-2">Email*</Text>
            <TextInput
              className="border border-gray-200 rounded-xl px-4 py-3 mb-3 bg-[#F9FAFF]"
              placeholder="zaki@gmail.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Text className="text-[13px] font-medium text-gray-700 mb-3 mt-2">Password*</Text>
            <TextInput
              className="border border-gray-200 rounded-xl px-4 py-3 mb-2 bg-[#F9FAFF]"
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <View className="flex-row items-center justify-between mt-2">
              <Pressable
                className="flex-row items-center"
                onPress={() => setRememberMe((prev) => !prev)}
              >
                <View
                  className={[
                    "w-4 h-4 rounded border mr-2 bg-white",
                    rememberMe ? "bg-blue-600 border-blue-600" : "border-gray-400",
                  ].join(" ")}
                />
                <Text className="text-[12px] text-gray-700">Remember me</Text>
              </Pressable>

              <Pressable onPress={onForgotPassword}>
                <Text className="text-[12px] text-blue-600 font-medium">Forgot Password</Text>
              </Pressable>
            </View>

            {error && <Text className="text-[12px] text-red-600 mt-2">{error}</Text>}
            {info && !error && <Text className="text-[12px] text-green-600 mt-2">{info}</Text>}
          </View>

          <Pressable
            className={[
              "mt-10 py-4 rounded-full items-center",
              canSubmit ? "bg-blue-600" : "bg-blue-600/50",
            ].join(" ")}
            onPress={onLogin}
            disabled={!canSubmit || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-[15px]">Log in</Text>
            )}
          </Pressable>

          <View className="mt-5 flex-row justify-center">
            <Text className="text-[12px] text-gray-500">First time here?</Text>
            <Pressable onPress={() => router.push("/register")} disabled={loading}>
              <Text className="text-[12px] text-blue-600 font-semibold"> Sign up</Text>
            </Pressable>
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}