import React from 'react';
import { Pressable, Text } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle = () => {
  const { themeName, toggleTheme } = useTheme();
  const isLight = themeName === 'light';

  return (
    <Pressable
      onPress={toggleTheme}
      className={`px-3 py-1.5 rounded-full items-center justify-center ${
        isLight ? 'bg-neutral-900/80' : 'bg-neutral-100/80'
      }`}
    >
      <Text
        className={`text-xs font-semibold ${
          isLight ? 'text-neutral-50' : 'text-neutral-900'
        }`}
      >
        {isLight ? 'Dark mode' : 'Light mode'}
      </Text>
    </Pressable>
  );
};

