import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Alert } from 'react-native';

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
  addTodo: (input: Omit<Todo, 'id' | 'createdAt'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (
    id: string,
    changes: Partial<
      Pick<Todo, 'title' | 'description' | 'category' | 'date' | 'time' | 'important'>
    >,
  ) => void;
};

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback(
    (input: Omit<Todo, 'id' | 'createdAt'>) => {
      const now = Date.now();
      const todo: Todo = {
        id: now.toString(),
        createdAt: now,
        ...input,
      };
      setTodos(prev => [todo, ...prev]);
    },
    [],
  );

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }, []);

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

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const updateTodo = useCallback(
    (
      id: string,
      changes: Partial<
        Pick<Todo, 'title' | 'description' | 'category' | 'date' | 'time' | 'important'>
      >,
    ) => {
      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, ...changes } : t)),
      );
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

