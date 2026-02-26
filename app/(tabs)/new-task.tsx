import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTodos } from '../src/store/todosStore';

const CATEGORIES = ['Work', 'Home', 'Fun'];

export default function NewTaskScreen() {
  const router = useRouter();
  const { addTodo } = useTodos();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('Work');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [important, setImportant] = useState(false);

  const canSave = title.trim().length > 0;

  const handleDone = () => {
    if (!canSave) return;

    const todayString = new Date().toISOString().slice(0, 10);

    addTodo({
      title: title.trim(),
      description: undefined,
      category,
      date: date || todayString,
      time: time || undefined,
      important,
      done: false,
    });

    router.replace('/');
  };

  const handleBack = () => {
    router.back();
  };

  const handleOpenMenu = () => {
    router.push('/(tabs)/lists');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="bg-blue-600 rounded-b-3xl px-5 pt-5 pb-6">
        <View className="flex-row items-center justify-between mb-3">
          <Pressable
            onPress={handleOpenMenu}
            className="w-9 h-9 rounded-full bg-blue-500/60 items-center justify-center"
          >
            <View className="w-4 h-[1.5px] bg-white mb-1" />
            <View className="w-4 h-[1.5px] bg-white mb-1" />
            <View className="w-4 h-[1.5px] bg-white mb-1" />
          </Pressable>
          <Text className="text-[35px] text-white font-semibold">New Task</Text>
          <Pressable
            onPress={handleBack}
            className="w-9 h-9 rounded-full bg-blue-500/60 items-center justify-center"
          >
            <Text className="text-2xl text-white">{'‹'}</Text>
          </Pressable>
        </View>
        <Text className="text-[12px] text-blue-100">
          Add a new task and set its details.
        </Text>
      </View>
      <ScrollView
        className="flex-1 px-5 pt-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <TextInput
          className="text-[14px] text-slate-900 mb-4 pb-2 border-b border-slate-200"
          placeholder="Add a description..."
          placeholderTextColor="#9CA3AF"
          value={title}
          onChangeText={setTitle}
        />
        <View className="py-3 border-b border-slate-200">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-[13px] text-slate-600">Category</Text>
            <Text className="text-[13px] text-slate-900">{category}</Text>
          </View>
          <View className="flex-row mt-1">
            {CATEGORIES.map(cat => {
              const selected = cat === category;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setCategory(cat)}
                  className={`px-6 py-1.5 mr-2 rounded-full border ${
                    selected
                      ? 'bg-blue-600 border-blue-600'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <Text
                    className={`text-[12px] font-medium ${
                      selected ? 'text-white' : 'text-slate-700'
                    }`}
                  >
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View className="py-3 border-b border-slate-200">
          <Text className="text-[13px] text-slate-600 mb-1">Date</Text>
          <TextInput
            className="text-[14px] text-slate-900"
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#9CA3AF"
            value={date}
            onChangeText={setDate}
          />
        </View>
        <View className="py-3 border-b border-slate-200">
          <Text className="text-[13px] text-slate-600 mb-1">Time</Text>
          <TextInput
            className="text-[14px] text-slate-900"
            placeholder="HH:MM"
            placeholderTextColor="#9CA3AF"
            value={time}
            onChangeText={setTime}
          />
        </View>
        <View className="py-3 border-b border-slate-200 flex-row items-center justify-between">
          <Text className="text-[13px] text-slate-600">Important?</Text>
          <Pressable
            onPress={() => setImportant(v => !v)}
            className={`w-6 h-6 rounded-md border ${
              important ? 'bg-amber-400 border-amber-400' : 'border-slate-300'
            }`}
          />
        </View>
        <View className="mt-10 items-center">
          <Pressable
            onPress={handleDone}
            disabled={!canSave}
            className={`w-40 py-3.5 rounded-full items-center ${
              canSave ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <Text className="text-[15px] text-white font-semibold">Done</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

