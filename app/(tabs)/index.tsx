import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";

import { auth } from "../src/services/firebase";

export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Erreur lors de la déconnexion :", e);
    }
  };

  return (
    <View className="flex-1 bg-[#2563EB]">

      <Pressable
        className="absolute top-10 right-5 px-3 py-1.5 rounded-full border border-white/50 z-10"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold text-[12px]">Se déconnecter</Text>
      </Pressable>


      <View className="flex-1 items-center justify-center">
        <View className="w-24 h-24 rounded-full border-[3px] border-white items-center justify-center mb-4">
          <Ionicons name="trending-up-outline" size={42} color="#2563EB" />
        </View>
        <Text className="text-white text-2xl font-bold">AureliaBank</Text>
      </View>

      <View className="absolute bottom-0 left-0 right-0 h-40 bg-[#1D4ED8] rounded-tl-[120px]" />
    </View>
  );
}