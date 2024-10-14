export const findBankIconFromCardNum = (
	cardNum: string,
	list: {
		id: number;
		cardnumber: string;
		icon: string;
		name: string;
	}[]
) => {
	const found = list.find((item) => {
		return item.cardnumber == cardNum.substring(0, 6);
	});

	return {
		icon: found?.icon,
		name: found?.name
	};
};
