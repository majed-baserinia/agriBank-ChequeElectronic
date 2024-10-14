export type ChakavakGetEChequeListResponse = chakavakCheck[];

export type chakavakCheck = {
	creditorAccount: number;
	customerNumber: number;
	chequeDate: string;
	depositDate: string;
	serial: string;
	chqStatus: number;
	chqStatusDesc: string;
	amount: number;
	clearId: string;
	debtorAccount: number;
	bankCode: number;
	bankName: string;
	bankBranch: string;
	branchName: string;
};
