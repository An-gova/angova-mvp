import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  }
}
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr",
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
    
  });

export default i18n;