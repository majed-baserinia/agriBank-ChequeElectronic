export interface CustomerCurrentAccountsResponse {
	issueChequeKey: string;
	needInquiryWithDrawalGroup: boolean;
	issueChequeOverView: issueChequeOverView;
}

export interface issueChequeOverView {
	sayadNo: string;
	seri: string;
	serial: string;
	amount: number;
	dueDate: string;
	reason: string;
	reasonDescription: string;
	description: string;
	toIBAN: string;
	signers: Signers;
	recievers: Recievers;
}

type Signers = {
	groupNumber: string;
	withdrawalGroups: {
		customerNumber: number;
		name: string;
	}[];
}[];

type Recievers = {
	name: string;
	shahabNo: string;
	nationalNo: string;
	customerType: 1 | 2 | 3 | 4;
	customerTypeDescription: string;
}[];
