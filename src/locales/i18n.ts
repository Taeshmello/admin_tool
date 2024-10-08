import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tranEn from './en.json';
import tranKo from './ko.json';
import tranCn from './zh.json';

const savedLanguage = localStorage.getItem('language');
const initialLanguage = savedLanguage ? savedLanguage : 'en';

const resources = {
  en: { translation: tranEn },
  ko: { translation: tranKo },
  cn: {translation:tranCn},
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage, 
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })
  

export default i18n;
