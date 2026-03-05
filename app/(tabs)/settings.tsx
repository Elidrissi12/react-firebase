import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function SettingsScreen() {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const [pushEnabled, setPushEnabled] = useState(false);

  return (
    <SafeAreaView
      className="flex-1 px-5 pt-12"
      style={{ backgroundColor: theme.background }}
    >
      <Text
        className={`text-[24px] font-semibold mb-6 ${
          themeName === 'light' ? 'text-slate-900' : 'text-slate-50'
        }`}
      >
        {t('settings.title')}
      </Text>

      <View className="mb-6">
        <Text
          className={`text-[13px] mb-2 ${
            themeName === 'light' ? 'text-slate-500' : 'text-slate-300'
          }`}
        >
          {t('settings.section.appearance')}
        </Text>
        <View className="flex-row items-center justify-between rounded-2xl px-4 py-3 bg-slate-100 dark:bg-slate-800">
          <Text
            className={`text-[14px] ${
              themeName === 'light' ? 'text-slate-900' : 'text-slate-100'
            }`}
          >
            {t('theme.label')}
          </Text>
          <ThemeToggle />
        </View>
      </View>

      <View className="mb-6">
        <Text
          className={`text-[13px] mb-2 ${
            themeName === 'light' ? 'text-slate-500' : 'text-slate-300'
          }`}
        >
          {t('settings.section.language')}
        </Text>
        <View className="flex-row items-center justify-between rounded-2xl px-4 py-3 bg-slate-100 dark:bg-slate-800">
          <Text
            className={`text-[14px] ${
              themeName === 'light' ? 'text-slate-900' : 'text-slate-100'
            }`}
          >
            {t('common.languageLabel')}
          </Text>
          <LanguageToggle />
        </View>
      </View>

      <View className="mb-6">
        <Text
          className={`text-[13px] mb-2 ${
            themeName === 'light' ? 'text-slate-500' : 'text-slate-300'
          }`}
        >
          {t('settings.section.notifications')}
        </Text>
        <View className="flex-row items-center justify-between rounded-2xl px-4 py-3 bg-slate-100 dark:bg-slate-800">
          <View className="flex-1 mr-3">
            <Text
              className={`text-[14px] mb-1 ${
                themeName === 'light' ? 'text-slate-900' : 'text-slate-100'
              }`}
            >
              {t('settings.notifications.push')}
            </Text>
            <Text
              className={`text-[12px] ${
                themeName === 'light' ? 'text-slate-500' : 'text-slate-300'
              }`}
            >
              {t('settings.notifications.description')}
            </Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: '#9CA3AF', true: '#2563EB' }}
            thumbColor={pushEnabled ? '#FFFFFF' : '#F9FAFB'}
          />
        </View>
      </View>

    </SafeAreaView>
  );
}

