export interface CheckSheet {
	type: string;
	branch: string;
	chequeFrom: string;
	chequeTo: string;
	issueDate: string;
	expiryDate: string;
	amount: string;
	comments: string;
	status: string;
	tranCode: string;
	reason: string;
	teller: string;
	postTime: string;
	traceNo: string;
	blackLSTDate: string;
	sayadNo: number;
	sayadChequebookType: string;
	isUsed: boolean;
}
 export type GetCheckSheetsResponse  = CheckSheet[]