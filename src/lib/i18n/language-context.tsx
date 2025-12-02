"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  translations,
  type Language,
  type TranslationKeys,
} from "./translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const LANGUAGE_STORAGE_KEY = "kulipoly-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(
      LANGUAGE_STORAGE_KEY
    ) as Language | null;
    if (stored && (stored === "id" || stored === "en")) {
      setLanguageState(stored);
    }
    setIsHydrated(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  }, []);

  const t = translations[language];

  // Prevent hydration mismatch by rendering children only after hydration
  if (!isHydrated) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Hook for components that only need translations
export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}
