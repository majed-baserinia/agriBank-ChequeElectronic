export type GetAccountsQueryResponse = Account[];

interface Account {
	accountNumber: number;
	accountTypeName: string;
	accountTypeCode: string;
	intCat: string;
	currencyType: string;
	accountStatus: string;
	accountStatusCode: string;
	isShared: boolean;
	owners: Owners[];
	iban: string;
	relationType: number;
	accountOwnershipType: number;
}

interface Owners {
	customerNumber: number;
	nationalCode: string;
	firstName: string;
	lastName: string;
	customerType: string;
	shahabNumber: string;
	birthDate: string;
}
