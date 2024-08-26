import { Theme } from '@mui/material';
import {
	formatGeorgianDate,
	formatPersianDate,
	formatToCard,
	formatToMoney,
	persianToEnglishDigits
} from 'common/utils/formatInput';
import { InputAdapterProps } from 'ui/htsc-components/InputAdapter/type';

type Options = {
	type: InputAdapterProps['type'];
	theme: Theme;
};
export function useFormatter({ type, theme }: Options) {
	return (value: string) => {
		return filter(type, theme, value);
	};
}

/**
 * @param type
 * @param value
 * @returns an object containing the original value, formatted value with any additional characters added and the numeric version
 * of the formatted value
 */
function filter(
	type: InputAdapterProps['type'],
	theme: Theme,
	value: string
): { original: string; formatted: string; numeric: string } {
	const originalValue = persianToEnglishDigits(value);

	// Remove non-numeric characters
	const numericValue = originalValue.replace(/[^0-9]/g, '');

	if (type === 'text' || type === 'password') {
		return { original: originalValue, formatted: originalValue, numeric: numericValue };
	}

	if (type === 'number') {
		return { original: originalValue, formatted: numericValue, numeric: numericValue };
	}

	if (type === 'card' || type === 'money') {
		// Format input as 4 digits separated by "-"
		const formattedValue = type == 'card' ? formatToCard(numericValue) : formatToMoney(numericValue);

		return {
			original: originalValue,
			formatted: formattedValue,
			numeric: formattedValue.replaceAll('-', '').replaceAll(',', '')
		};
	}

	if (type === 'date') {
		let formattedValue =
			theme.direction === 'rtl' ? formatPersianDate(numericValue) : formatGeorgianDate(numericValue);
		return {
			original: originalValue,
			formatted: formattedValue,
			numeric: formattedValue.replaceAll('-', '').replaceAll('/', '')
		};
	}

	return { original: originalValue, formatted: originalValue, numeric: numericValue };
}
