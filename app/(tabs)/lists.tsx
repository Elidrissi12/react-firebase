import React, { useMemo } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTodos } from '../src/store/todosStore';

type ListItem = {
  key: string;
  label: string;
  color: string;
};

const STATIC_LISTS: ListItem[] = [
  { key: 'today', label: 'Today', color: '#2563EB' }, 
  { key: 'this-week', label: 'This week', color: '#F97316' }, 
  { key: 'this-month', label: 'This month', color: '#EC4899' }, 
  { key: 'all', label: 'All tasks', color: '#7C2D12' }, 
  { key: 'Work', label: 'Work', color: '#06B6D4' }, 
  { key: 'Home', label: 'Home', color: '#8B5CF6' }, 
  { key: 'Fun', label: 'Fun', color: '#EF4444' }, 
];

export default function ListsScreen() {
  const router = useRouter();
  const { todos } = useTodos();

  const counts = useMemo(() => {
    const now = new Date();
    const todayKey = now.toISOString().slice(0, 10);
    const startOfToday = new Date(todayKey).getTime();
    const startOfWeek = startOfToday - 6 * 24 * 60 * 60 * 1000;
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    ).getTime();

    const allCount = todos.length;
    const todayCount = todos.filter(t => t.date === todayKey).length;
    const weekCount = todos.filter(t => t.createdAt >= startOfWeek).length;
    const monthCount = todos.filter(t => t.createdAt >= startOfMonth).length;

    const byCategory: Record<string, number> = {};
    todos.forEach(t => {
      byCategory[t.category] = (byCategory[t.category] ?? 0) + 1;
    });

    return {
      today: todayCount,
      'this-week': weekCount,
      'this-month': monthCount,
      all: allCount,
      Work: byCategory.Work ?? 0,
      Home: byCategory.Home ?? 0,
      Fun: byCategory.Fun ?? 0,
    };
  }, [todos]);

  const handlePressList = (key: string) => {
    router.push({
      pathname: '/(tabs)',
      params: { category: key },
    });
  };

  const renderItem = ({ item }: { item: ListItem }) => {
    const count = counts[item.key as keyof typeof counts] ?? 0;

    return (
      <Pressable
        onPress={() => handlePressList(item.key)}
        className="flex-row items-center justify-between py-3 border-b border-slate-200"
      >
        <View className="flex-1">
          <Text className="text-[15px] text-slate-900 font-medium">
            {item.label}
          </Text>
          <Text className="text-[12px] text-slate-400 mt-0.5">
            {count} items
          </Text>
        </View>
        <View
          className="w-4 h-4 rounded-md"
          style={{ backgroundColor: item.color }}
        />
      </Pressable>
    );
  };

  return (
    <View className="flex-1 bg-white pt-12 px-5">
      <View className="flex-row items-center mb-4">
        <Pressable className="w-8 h-8 rounded-full items-center justify-center mr-3">
          <View className="w-4 h-[1.5px] bg-slate-700 mb-1" />
          <View className="w-4 h-[1.5px] bg-slate-700 mb-1" />
          <View className="w-4 h-[1.5px] bg-slate-700" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-[20px] font-semibold text-slate-900">
            All lists
          </Text>
          <Text className="text-[12px] text-slate-400 mt-0.5">
            7 categories
          </Text>
        </View>
      </View>

      <FlatList
        data={STATIC_LISTS}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        contentContainerClassName="pb-4"
        ListFooterComponent={
          <View className="pt-3 border-t border-slate-200 mt-3 flex-row items-center justify-between">
            <Text className="text-[14px] text-slate-500">
              Add a new list...
            </Text>
            <Pressable className="w-7 h-7 rounded-full border border-slate-400 items-center justify-center">
              <Text className="text-[18px] text-slate-500">+</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

