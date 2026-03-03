import React from 'react';
import { Pressable, Text } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle = () => {
  const { themeName, toggleTheme } = useTheme();
  const isLight = themeName === 'light';

  return (
    <Pressable
      onPress={toggleTheme}
      className={`px-2 py-1.5 rounded-full items-center justify-center ${
        isLight ? 'bg-neutral-900/80' : 'bg-neutral-100/80'
      }`}
    >
      <Text
        className={`ml-2 px-2 py-1.5 rounded-full flex-row items-center justify-center  ${
              themeName === 'light' ? 'text-slate-900' : 'text-slate-200'
            }`}
      style={{
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.7)',
      }}
      >
        {isLight ? 'Dark mode' : 'Light mode'}
      </Text>
    </Pressable>
  );
};

