import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ro from './locales/ro.json';
import ru from './locales/ru.json';

i18n
  .use(LanguageDetector) // автоопределение языка
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      ro: { translation: ro }
    },
    fallbackLng: 'ru', // язык по умолчанию
    interpolation: {
      escapeValue: false // не экранируем HTML
    }
  });

export default i18n;
