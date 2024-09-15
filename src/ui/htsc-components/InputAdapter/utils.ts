import { formatPersianDate, formatToCard, formatToMoney, persianToEnglishDigits } from 'common/utils/formatInput';

import { Theme } from '@mui/material';
import type { InputType } from './type';

export function isInputTypeNumeric(type: InputType) {
	return type === 'card' || type === 'money' || type === 'number' || type === 'date';
}

/**
 * @param type
 * @param value
 * @returns an object containing the original value, formatted value with any additional characters added and the numeric version
 * of the formatted value
 */
export function filter(
	type: InputType,
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
		let formattedValue = formatPersianDate(numericValue);
		return {
			original: originalValue,
			formatted: formattedValue,
			numeric: formattedValue.replaceAll('-', '').replaceAll('/', '')
		};
	}

	return { original: originalValue, formatted: originalValue, numeric: numericValue };
}
