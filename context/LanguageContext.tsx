import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { messages, type Language } from '@/i18n';

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string, fallback?: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

function getByPath(obj: any, path: string): any {
  return path
    .split('.')
    .reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), obj);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'fr' ? 'en' : 'fr'));
  }, []);

  const t = useCallback(
    (key: string, fallback?: string) => {
      const value = getByPath(messages[language], key);
      if (typeof value === 'string') return value;
      return fallback ?? key;
    },
    [language],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
    }),
    [language, setLanguage, toggleLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}