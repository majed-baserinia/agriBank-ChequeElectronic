export type ChakavakGetEChequeListResponse = chakavakCheck[];

export type chakavakCheck = {
	CrdtAcnt: string;
	CustNo: string;
	ChequeDate: string;
	DepositDate: string;
	Serial: string;
	ChqStatus: number;
	ChqStatusDesc: string;
	Amnt: number;
	ClearId: number;
	DebtAcnt: string;
	BankCode: number;
	BankName: string;
	BankBraanch: string;
	BranchName: string;
};
