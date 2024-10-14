export interface IssueWithGroupResponse {
	issueChequeKey: string;
	issueChequeOverView: IssueChequeOverView;
}

export interface IssueChequeOverView {
	sayadNo: number;
	seri: string;
	serial: string;
	amount: number;
	dueDate: string;
	reason: string;
	description: string;
	toIBAN: string;
	signers: Signer[];
	recievers: Reciever[];
}

export interface Reciever {
	name: string;
	shahabNo: string;
	nationalNo: string;
	customerType: 1 | 2 | 3 | 4;
	customerTypeDescription: string;
}

export interface Signer {
	groupNumber: string;
	withdrawalGroups: WithdrawalGroup[];
}

export interface WithdrawalGroup {
	customerNumber: number;
	name: string;
}
