import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import arTranslation from "./ar/translation.json";
import enTranslation from "./en/translation.json";

const LanguageDetector = {
  type: "languageDetector" as const,
  detect: () => "en",
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    debug: true,
    defaultNS: "translation",
    ns: ["translation"],
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
  });
