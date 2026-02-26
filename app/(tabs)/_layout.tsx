import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TodosProvider } from '../src/store/todosStore';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <TodosProvider>
      <Tabs
  screenOptions={{
    tabBarActiveTintColor: '#2563EB',   
    tabBarInactiveTintColor: '#6B7280', 
    headerShown: false,
    tabBarButton: HapticTab,
  }}
>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Tasks',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="checklist" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="lists"
          options={{
            title: 'Lists',
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
            title: 'Explore',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </TodosProvider>
  );
}
