import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { TodosProvider } from '../src/store/todosStore';

export default function TabLayout() {
  const { themeName } = useTheme();
  const { t } = useLanguage();

  return (
    <TodosProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[themeName].tabIconSelected,
          tabBarInactiveTintColor: Colors[themeName].tabIconDefault,
          tabBarStyle: {
            backgroundColor: Colors[themeName].surface,
            borderTopColor: Colors[themeName].border,
          },
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('tabs.todos'),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="checklist" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="lists"
          options={{
            title: t('tabs.lists'),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="list.bullet" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="new-task"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: t('tabs.explore'),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </TodosProvider>
  );
}
