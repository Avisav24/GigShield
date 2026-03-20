import { useEffect, useState } from "react";
import { languageModes } from "./i18n";

const siteLanguageStorageKey = "gigshieldLanguageMode";

export function getStoredLanguageMode() {
  const stored = localStorage.getItem(siteLanguageStorageKey);
  if (
    stored === languageModes.ENGLISH ||
    stored === languageModes.HINDI ||
    stored === languageModes.HINGLISH
  ) {
    return stored;
  }
  return languageModes.ENGLISH;
}

export function useSiteLanguage() {
  const [languageMode, setLanguageMode] = useState(getStoredLanguageMode);

  useEffect(() => {
    localStorage.setItem(siteLanguageStorageKey, languageMode);
  }, [languageMode]);

  return { languageMode, setLanguageMode };
}
