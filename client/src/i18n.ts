import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ua from './locales/ua.json';

const language = localStorage.getItem('lang') || 'en';

i18n.use(initReactI18next).init({
	resources: {
		en: { translations: en },
		ua: { translations: ua },
	},
	fallbackLng: ['en', 'ua'],
	lng: language,
	debug: false,
	ns: ['translations'],
	defaultNS: 'translations',
	keySeparator: false,
	interpolation: {
		escapeValue: false,
		formatSeparator: ',',
	},
});

export default i18n;
