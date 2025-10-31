"use client";

import { useState, useEffect } from "react";
import { Language, getTranslations } from "@/lib/translations";

export const useLanguage = (defaultLanguage: Language = "en") => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Get language from localStorage or browser preference
    const stored = localStorage.getItem("language") as Language;
    if (stored) {
      setLanguage(stored);
    } else {
      const browserLang = navigator.language.split("-")[0] as Language;
      const validLanguage: Language = ["en", "fr", "es"].includes(browserLang)
        ? browserLang
        : "en";
      setLanguage(validLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = getTranslations(language);

  return { language, changeLanguage, t, isClient };
};
