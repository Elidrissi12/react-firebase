import React, { useMemo } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTodos, type Todo } from '../src/store/todosStore';

const formatTodayLabel = () => {
  const d = new Date();
  const formatted = d.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
  });
  return `Today: ${formatted}`;
};

const filterByCategory = (todos: Todo[], category?: string | string[]) => {
  if (!category) return todos;
  const key = Array.isArray(category) ? category[0] : category;

  switch (key) {
    case 'today': {
      const today = new Date().toISOString().slice(0, 10);
      return todos.filter(t => t.date === today);
    }
    case 'this-week': {
      const now = Date.now();
      const weekAgo = now - 6 * 24 * 60 * 60 * 1000;
      return todos.filter(t => t.createdAt >= weekAgo);
    }
    case 'this-month': {
      const now = new Date();
      const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
      ).getTime();
      return todos.filter(t => t.createdAt >= startOfMonth);
    }
    case 'all':
      return todos;
    default:
      return todos.filter(t => t.category === key);
  }
};

const checkboxColorForCategory = (category: string) => {
  switch (category) {
    case 'Work':
      return '#2563EB';
    case 'Home':
      return '#16A34A';
    case 'Fun':
      return '#F97316';
    default:
      return '#6B7280';
  }
};

export default function TasksScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const { todos, toggleTodo } = useTodos();

  const filteredTodos = useMemo(
    () => filterByCategory(todos, category),
    [todos, category],
  );

  const total = filteredTodos.length || 0;
  const doneCount = filteredTodos.filter(t => t.done).length;

  const handleNewTask = () => {
    router.push('/(tabs)/new-task');
  };

  const handleOpenLists = () => {
    router.push('/(tabs)/lists');
  };

  const handleBack = () => {
    router.back();
  };

  const renderItem = ({ item }: { item: Todo }) => {
    const color = checkboxColorForCategory(item.category);
    return (
      <View className="flex-row items-center py-3 border-b border-slate-200">
        <View className="flex-1">
          <Text
            className={`text-[14px] ${
              item.done ? 'text-slate-400 line-through' : 'text-slate-900'
            }`}
          >
            {item.title}
          </Text>
          {(item.time || item.description) && (
            <Text className="text-[11px] text-slate-500 mt-0.5">
              {item.time ?? item.description}
            </Text>
          )}
        </View>

        <Pressable
          onPress={() => toggleTodo(item.id)}
          className="w-5 h-5 rounded border mr-1.5 items-center justify-center"
          style={{ borderColor: color }}
        >
          {item.done ? (
            <View
              className="w-3 h-3 rounded"
              style={{ backgroundColor: color }}
            />
          ) : null}
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-blue-600 rounded-b-3xl px-5 pt-5 pb-6">
        <View className="flex-row items-center justify-between mb-3">
          <Pressable
            onPress={handleOpenLists}
            className="w-9 h-9 rounded-full bg-blue-500/60 items-center justify-center"
          >
            <View className="w-4 h-[1.5px] bg-white mb-1" />
            <View className="w-4 h-[1.5px] bg-white mb-1" />
            <View className="w-4 h-[1.5px] bg-white" />
          </Pressable>

          <Pressable
            onPress={handleBack}
            className="w-9 h-9 rounded-full bg-blue-500/60 items-center justify-center"
          >
            <Text className="text-2xl text-white">{'‹'}</Text>
          </Pressable>
        </View>

        <Text className="text-xs text-blue-100 mb-1">
          {formatTodayLabel()}
        </Text>
        <Text className="text-[12px] text-blue-100 mb-2">
          {doneCount} of {total} items
        </Text>
      </View>

      <View className="flex-1 px-5 pt-4">
        <Pressable
          onPress={handleNewTask}
          className="flex-row items-center justify-between py-3 border-b border-slate-200 mb-1"
        >
          <Text className="text-[13px] text-slate-400">
            Add a new item...
          </Text>
          <View className="w-5 h-5 rounded border border-slate-400 items-center justify-center">
            <Text className="text-[14px] text-slate-500">+</Text>
          </View>
        </Pressable>

        {filteredTodos.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-[14px] text-slate-400">
              No tasks yet. Tap “Add a new item...” to create one.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredTodos}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerClassName="pb-4"
          />
        )}
      </View>
    </SafeAreaView>
  );
}