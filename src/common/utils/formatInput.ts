export const formatToCard = (value: string) => {
	return value.replace(/(\d{4})/g, '$1-').slice(0, 19);
};

export const formatToMoney = (value: string) => {
	// Format input as 3 digits from right separated by ","
	const sanitizedInput = value.replace(/[^0-9]/g, '');
	const length = sanitizedInput.length;

	if (length <= 3) {
		return sanitizedInput;
	}

	const formattedValue =
		sanitizedInput.slice(0, length % 3 || 3) + sanitizedInput.slice(length % 3 || 3).replace(/(\d{3})/g, ',$1');

	return formattedValue;
};

export const persianToEnglishDigits = (str: string) => {
	const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
	const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	return str.replace(/[۰-۹]/g, (match) => englishDigits[persianDigits.indexOf(match)]);
};

export const formatPersianDate = (str: string): string => {
	let formattedValue = '';

	if (str.length > 4 && str.length <= 6) {
		let month = str.substring(4, 6);
		if (parseInt(month, 10) > 12) {
			month = '12'; // Set to max month 12 if the input exceeds 12
		}
		formattedValue = str.substring(0, 4) + '/' + month;
	} else if (str.length > 6) {
		let month = str.substring(4, 6);
		let day = str.substring(6, 8);
		if (parseInt(month, 10) > 12) {
			month = '12'; // Set to max month 12 if the input exceeds 12
		}
		if (parseInt(day, 10) > 31) {
			day = '31'; // Set to max day 31 if the input exceeds 31
		}
		formattedValue = str.substring(0, 4) + '/' + month + '/' + day;
	} else {
		formattedValue = str;
	}

	return formattedValue;
};

export const formatGeorgianDate = (str: string): string => {
	let formattedValue = '';

	if (str.length > 2 && str.length <= 4) {
		let month = str.substring(0, 2);
		if (parseInt(month, 10) > 12) {
			month = '12'; // Set to max month 12 if the input exceeds 12
		}
		formattedValue = month + '/' + str.substring(2);
	} else if (str.length > 4) {
		let month = str.substring(0, 2);
		let day = str.substring(2, 4);
		if (parseInt(month, 10) > 12) {
			month = '12'; // Set to max month 12 if the input exceeds 12
		}
		if (parseInt(day, 10) > 31) {
			day = '31'; // Set to max day 31 if the input exceeds 31
		}
		formattedValue = month + '/' + day + '/' + str.substring(4, 8);
	} else {
		formattedValue = str;
	}
	return formattedValue;
};
