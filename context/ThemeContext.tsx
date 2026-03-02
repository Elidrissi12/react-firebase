import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '@/constants/theme';

export type ThemeName = 'light' | 'dark';

export type AppTheme = {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  secondary: string;
  success: string;
  danger: string;
};

type ThemeContextValue = {
  themeName: ThemeName;
  theme: AppTheme;
  setTheme: (name: ThemeName) => void;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = '@app_theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const mapTheme = (name: ThemeName): AppTheme => {
  const palette = Colors[name];

  return {
    background: palette.background,
    surface: palette.surface,
    text: palette.text,
    textSecondary: palette.textSecondary,
    border: palette.border,
    primary: palette.primary,
    secondary: palette.secondary,
    success: palette.success,
    danger: palette.danger,
  };
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useDeviceColorScheme();
  const systemDefault: ThemeName = systemScheme === 'dark' ? 'dark' : 'light';

  const [themeName, setThemeName] = useState<ThemeName>(systemDefault);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (!isMounted) return;
        if (stored === 'light' || stored === 'dark') {
          setThemeName(stored);
        }
      } catch {
        // ignore
      } finally {
        if (isMounted) setHydrated(true);
      }
    };

    loadTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(THEME_STORAGE_KEY, themeName).catch(() => {
      // ignore
    });
  }, [themeName, hydrated]);

  const setTheme = useCallback((name: ThemeName) => {
    setThemeName(name);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeName(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(() => mapTheme(themeName), [themeName]);

  const value: ThemeContextValue = useMemo(
    () => ({
      themeName,
      theme,
      setTheme,
      toggleTheme,
    }),
    [themeName, theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};

