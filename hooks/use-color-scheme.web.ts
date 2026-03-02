import { useTheme } from '@/context/ThemeContext';

export function useColorScheme() {
  const { themeName } = useTheme();
  return themeName;
}
