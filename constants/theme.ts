

import { Platform } from 'react-native';

const tintColorLight = '#2563EB';
const tintColorDark = '#38BDF8';

export const Colors = {
  light: {
    text: '#111827',
    textSecondary: '#6B7280',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    border: '#E5E7EB',
    primary: tintColorLight,
    secondary: '#6366F1',
    success: '#22C55E',
    danger: '#EF4444',
    tint: tintColorLight,
    icon: '#6B7280',
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    background: '#020617',
    surface: '#020617',
    border: '#1F2933',
    primary: tintColorDark,
    secondary: '#A855F7',
    success: '#22C55E',
    danger: '#F97373',
    tint: tintColorDark,
    icon: '#9CA3AF',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
