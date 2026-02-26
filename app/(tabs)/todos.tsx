import React, { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
};

export default function TodosScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState('');

  const canAdd = newTodoText.trim().length > 0;
  const canSaveEdit = editText.trim().length > 0;

  const counters = useMemo(() => {
    const total = todos.length;
    const remaining = todos.filter(t => !t.done).length;
    return { total, remaining };
  }, [todos]);

  const addTodo = () => {
    if (!canAdd) return;

    const trimmed = newTodoText.trim();
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: trimmed,
      done: false,
      createdAt: Date.now(),
    };
    setTodos(prev => [newTodo, ...prev]);
    setNewTodoText('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  };
  const confirmDelete = (id: string) => {
  Alert.alert(
    'Delete task?',
    'Are you sure you want to delete this task?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteTodo(id) },
    ]
  );
};

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const openEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (!editingTodo || !canSaveEdit) return;

    const trimmed = editText.trim();
    setTodos(prev =>
      prev.map(todo =>
        todo.id === editingTodo.id ? { ...todo, text: trimmed } : todo,
      ),
    );
    setEditingTodo(null);
    setEditText('');
  };

  const closeEdit = () => {
    setEditingTodo(null);
    setEditText('');
  };

  const renderItem = ({ item }: { item: Todo }) => {
    return (
      <View className="flex-row items-center px-3 py-2 mb-2 rounded-xl bg-slate-50 border border-slate-200">
        <Pressable
          onPress={() => toggleTodo(item.id)}
          className="w-6 h-6 rounded-md border border-slate-300 items-center justify-center mr-3"
        >
          {item.done ? (
            <View className="w-4 h-4 rounded bg-blue-600" />
          ) : null}
        </Pressable>

        <View className="flex-1">
          <Text
            className={`text-[14px] ${
              item.done ? 'text-slate-400 line-through' : 'text-slate-900'
            }`}
          >
            {item.text}
          </Text>
        </View>

        <Pressable
          onPress={() => openEdit(item)}
          className="px-2 py-1 rounded-lg mr-2 border border-slate-200"
        >
          <Text className="text-[12px] text-slate-700 font-medium">Edit</Text>
        </Pressable>

        <Pressable
          onPress={() => confirmDelete(item.id)}
          className="px-2 py-1 rounded-lg bg-red-500"
        >
          <Text className="text-[12px] text-white font-medium">Delete</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 px-5 pt-12 pb-4">
        <View className="mb-4">
          <Text className="text-2xl font-bold text-slate-900">Todo List</Text>
          <Text className="text-[12px] text-slate-500 mt-1">
            {counters.total} total • {counters.remaining} remaining
          </Text>
        </View>

        <View className="flex-row items-center mb-4">
          <TextInput
            className="flex-1 border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 text-[14px] text-slate-900"
            placeholder="Add a new task..."
            placeholderTextColor="#9CA3AF"
            value={newTodoText}
            onChangeText={setNewTodoText}
          />
          <Pressable
            onPress={addTodo}
            disabled={!canAdd}
            className={`ml-2 px-4 py-2 rounded-xl items-center justify-center ${
              canAdd ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <Text className="text-[13px] font-semibold text-white">Add</Text>
          </Pressable>
        </View>

        {todos.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-[14px] text-slate-400">
              No todos yet. Start by adding one above.
            </Text>
          </View>
        ) : (
          <FlatList
            data={todos}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerClassName="pb-4"
          />
        )}
      </View>

      <Modal
        visible={!!editingTodo}
        transparent
        animationType="fade"
        onRequestClose={closeEdit}
      >
        <View className="flex-1 bg-black/40 items-center justify-center px-6">
          <View className="w-full rounded-2xl bg-white p-5">
            <Text className="text-base font-semibold text-slate-900 mb-3">
              Edit todo
            </Text>
            <TextInput
              className="border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 text-[14px] text-slate-900 mb-4"
              value={editText}
              onChangeText={setEditText}
              placeholder="Update task..."
              placeholderTextColor="#9CA3AF"
            />
            <View className="flex-row justify-end">
              <Pressable
                onPress={closeEdit}
                className="px-4 py-2 rounded-xl mr-2 border border-slate-200"
              >
                <Text className="text-[13px] text-slate-700">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={saveEdit}
                disabled={!canSaveEdit}
                className={`px-4 py-2 rounded-xl ${
                  canSaveEdit ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <Text className="text-[13px] text-white font-semibold">Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

