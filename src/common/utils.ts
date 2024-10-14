export function formatCardNumber(cardNumber: string): string {
	return cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
}

export function numberWithCommas(amount: number) {
	return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function isNumeric(value: string) {
	return !isNaN(parseFloat(value));
}
export function prvFunToDigitsNumber(prmInputText: string) {
	let varResult = '';

	if (prmInputText == undefined || prmInputText == '') {
		return varResult;
	}

	if (prmInputText.length > 0) {
		for (let i = 0; i < prmInputText.length; i++) {
			varResult += convertToPersianNumber(prmInputText.charAt(i));

			//console.log("varResult :: " + varResult);
		}
	}

	return varResult;
}

export function formatAmount(prmNumber: string) {
	try {
		if (prmNumber === undefined) {
			return '0';
		}

		let n = 0;
		n = parseInt(prmNumber);
		if (isNaN(n) || n === undefined || n === null) n = 0;
		if (n === 0) {
			return '0';
		}
		return n.toLocaleString();
	} catch (e) {
		return '0';
	}
}

export function splitCardMaterial(prmCrdNo: string) {
	if (!prmCrdNo) {
		return '';
	}
	const parts = prmCrdNo.match(/.{1,4}/g);
	const new_value = parts!.join('-');
	return new_value;
}

export function prvFunToPersinaNumber(prmInputText: string) {
	if (prmInputText == undefined) {
		return '';
	}

	let varResult = '';
	if (prmInputText.length > 0) {
		for (let i = 0; i < prmInputText.length; i++) {
			varResult += convertToPersianNumber(prmInputText.charAt(i));
		}
	}

	return varResult;
}

export function splitCard(prmCrdNo: string) {
	if (!prmCrdNo) {
		return '';
	}
	const parts = prmCrdNo.match(/.{1,4}/g);
	const new_value = parts!.join('-');
	return new_value;
}
export function convertToPersianNumber(prmInputText: string) {
	//''''''''''''''''''''''''''''''''''''''''''''اعداد انگلیسی

	prmInputText = prmInputText.replace('0', '۰'); //String.fromCharCode(1776)
	prmInputText = prmInputText.replace('1', '۱'); //String.fromCharCode(1777)
	prmInputText = prmInputText.replace('2', '۲'); //String.fromCharCode(1778)
	prmInputText = prmInputText.replace('3', '۳'); //String.fromCharCode(1779)
	prmInputText = prmInputText.replace('4', '۴'); //String.fromCharCode(1780)
	prmInputText = prmInputText.replace('5', '۵'); //String.fromCharCode(1781)
	prmInputText = prmInputText.replace('6', '۶'); //String.fromCharCode(1782)
	prmInputText = prmInputText.replace('7', '۷'); //String.fromCharCode(1783)
	prmInputText = prmInputText.replace('8', '۸'); //String.fromCharCode(1784)
	prmInputText = prmInputText.replace('9', '۹'); //String.fromCharCode(1785)

	return prmInputText;
}
