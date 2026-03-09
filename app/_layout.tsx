import React, { useEffect, useState } from 'react';
import { Slot, useRouter } from 'expo-router';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LogoutButton } from '@/components/LogoutButton';
import { auth } from './src/services/firebase';
import { registerForPushNotificationsAsync } from './notificationsConfig';
import '../global.css';

function AuthGate() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (user) router.replace('/');
    else router.replace('/login');
  }, [ready, user, router]);

  return (
    <View className="flex-1">
      <Slot />
      <View
        className="absolute right-4 flex-row items-center"
        style={{ top: insets.top + 10 }}
      >
        <ThemeToggle />
        <LanguageToggle />
        {user && <LogoutButton />}
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <AuthGate />
        </SafeAreaProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}