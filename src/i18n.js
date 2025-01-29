import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import en from "./locales/en.json";
import fr from "./Lang/French/fr2.json";
import es from "./Lang/Spanish/es.json";
const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
    //   en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
    },
    lng: savedLanguage, // Set saved language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
