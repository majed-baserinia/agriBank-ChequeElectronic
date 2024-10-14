export interface Accounts {
	Accounts: string;
}

export const SaveAccounts = (account: Accounts): void => {
	sessionStorage.setItem('Accounts', JSON.stringify(account.Accounts));
};

class AccountModel {
	acc: string;
	exp: string;
	isjari: boolean;
	cur: string;
	exp2: string;
	isdefaultaccbasedoncommonacc: any;

	constructor(
		acc: string,
		exp: string,
		isjari: boolean,
		cur: string,
		exp2: string,
		isdefaultaccbasedoncommonacc: any
	) {
		this.acc = acc;
		this.exp = exp;
		this.isjari = isjari;
		this.cur = cur;
		this.exp2 = exp2;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		this.isdefaultaccbasedoncommonacc = isdefaultaccbasedoncommonacc;
	}
}

export const getAccounts = () => {
	const accountsData = sessionStorage.getItem('Accounts');
	if (Array.isArray(accountsData)) {
		const accounts = accountsData.map((x) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
			return new AccountModel(x.acc, x.exp, x.isjari, x.cur, x.exp2, x.isdefaultaccbasedoncommonacc);
		});
		return { data: accounts };
	} else return { data: null };
};
