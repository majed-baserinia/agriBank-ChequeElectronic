import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN_TRANSLATION from './common/locales/en/translation.json';
import FA_TRANSLATION from './common/locales/fa/translation.json';

void i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		// the translations
		// (tip move them in a JSON file and import them,
		// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
		resources: {
			'en-GB': {
				translation: EN_TRANSLATION
			},
			'fa-IR': {
				translation: FA_TRANSLATION
			}
		},
		lng: 'fa-IR', // if you're using a language detector, do not define the lng option
		fallbackLng: 'fa-IR',

		interpolation: {
			escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
		}
	});

export default i18n;

//makes sure all the keys of Fa and En are the same
FA_TRANSLATION satisfies typeof EN_TRANSLATION;
EN_TRANSLATION satisfies typeof FA_TRANSLATION;
