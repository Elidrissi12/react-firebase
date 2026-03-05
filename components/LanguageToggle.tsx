// components/LanguageToggle.tsx
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const { themeName } = useTheme();
  const isLight = themeName === 'light';

  const activeBg = isLight ? 'bg-slate-900' : 'bg-slate-50';
  const inactiveBg = isLight ? 'bg-slate-100/70' : 'bg-slate-900/40';
  const activeText = isLight ? 'text-slate-50' : 'text-slate-900';
  const inactiveText = isLight ? 'text-slate-700' : 'text-slate-200';

  return (
    <View className="ml-3 rounded-full bg-black/5 dark:bg-white/10">
      <View className="flex-row items-center rounded-full overflow-hidden">
        <Pressable
          className={`px-3 py-1 ${
            language === 'fr' ? activeBg : inactiveBg
          }`}
          onPress={() => setLanguage('fr')}
        >
          <Text
            className={`text-[11px] font-semibold tracking-wide ${
              language === 'fr' ? activeText : inactiveText
            }`}
          >
            FR
          </Text>
        </Pressable>
        <Pressable
          className={`px-3 py-1 ${
            language === 'en' ? activeBg : inactiveBg
          }`}
          onPress={() => setLanguage('en')}
        >
          <Text
            className={`text-[11px] font-semibold tracking-wide ${
              language === 'en' ? activeText : inactiveText
            }`}
          >
            EN
          </Text>
        </Pressable>
      </View>
    </View>
  );
};