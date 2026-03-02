import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { signOut } from 'firebase/auth';

import { useTheme } from '@/context/ThemeContext';
import { auth } from '../app/src/services/firebase';

export const LogoutButton = () => {
  const { themeName } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      onPress={handleLogout}
      disabled={loading}
      className="ml-2 px-3 py-1.5 rounded-full flex-row items-center justify-center"
      style={{
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.7)',
      }}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text className="text-xs font-semibold text-white">
          Logout
        </Text>
      )}
    </Pressable>
  );
};

