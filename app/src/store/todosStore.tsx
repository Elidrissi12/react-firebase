import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

import { auth, db } from '../services/firebase';

export type Todo = {
  id: string;
  title: string;
  description?: string;
  category: string;
  date?: string;
  time?: string;
  important: boolean;
  done: boolean;
  createdAt: number;
};

type TodosContextValue = {
  todos: Todo[];
  addTodo: (input: Omit<Todo, 'id' | 'createdAt'>) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  updateTodo: (
    id: string,
    changes: Partial<
      Pick<Todo, 'title' | 'description' | 'category' | 'date' | 'time' | 'important'>
    >,
  ) => Promise<void>;
};

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = collection(db, 'users', user.uid, 'todos');
    const unsub = onSnapshot(ref, snap => {
      const items: Todo[] = snap.docs.map(d => ({
        id: d.id,
        ...(d.data() as Omit<Todo, 'id'>),
      }));
      setTodos(items);
    });

    return unsub;
  }, []);

  const addTodo = useCallback(
    async (input: Omit<Todo, 'id' | 'createdAt'>) => {
      const user = auth.currentUser;
      if (!user) return;
      const ref = collection(db, 'users', user.uid, 'todos');
      const { title, category, important, done, description, date, time } =
        input;
      const payload: any = {
        title,
        category,
        important,
        done,
        createdAt: Date.now(),
      };
      if (description !== undefined) payload.description = description;
      if (date !== undefined) payload.date = date;
      if (time !== undefined) payload.time = time;
      await addDoc(ref, payload);
    },
    [],
  );

  const toggleTodo = useCallback(
    async (id: string) => {
      const user = auth.currentUser;
      if (!user) return;
      const current = todos.find(t => t.id === id);
      if (!current) return;
      const ref = doc(db, 'users', user.uid, 'todos', id);
      await updateDoc(ref, { done: !current.done });
    },
    [todos],
  );

  const deleteTodo = useCallback(async (id: string) => {
    const user = auth.currentUser;
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'todos', id);
    await deleteDoc(ref);
  }, []);

  const updateTodo = useCallback(
    async (
      id: string,
      changes: Partial<
        Pick<Todo, 'title' | 'description' | 'category' | 'date' | 'time' | 'important'>
      >,
    ) => {
      const user = auth.currentUser;
      if (!user) return;
      const ref = doc(db, 'users', user.uid, 'todos', id);
      const cleanChanges = Object.fromEntries(
        Object.entries(changes).filter(([, value]) => value !== undefined),
      );
      if (Object.keys(cleanChanges).length === 0) return;
      await updateDoc(ref, cleanChanges);
    },
    [],
  );

  const value = useMemo(
    () => ({
      todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      updateTodo,
    }),
    [todos, addTodo, toggleTodo, deleteTodo, updateTodo],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodos = () => {
  const ctx = useContext(TodosContext);
  if (!ctx) {
    throw new Error('useTodos must be used within a TodosProvider');
  }
  return ctx;
};

