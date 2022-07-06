import { enUS, huHU, IStrings } from '../localization';

const getLocalizedString = (): IStrings => {
	const currentLocale = window.navigator.language;

	switch (currentLocale.toLowerCase()) {
		default:
		case 'hu-hu':
		case 'hu_hu':
		case 'hu': {
			return huHU;
		}

		case 'en-us':
		case 'en_us':
		case 'en_gb':
		case 'en-gb':
		case 'en': {
			return enUS;
		}
	}
};

export default getLocalizedString();
