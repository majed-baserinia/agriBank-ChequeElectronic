export interface VerifyOtpResponse {
	issueChequeKey: string;
	needInquiryWithDrawalGroup: boolean;
	issueChequeOverView: IssueChequeOverView;
}

export interface IssueChequeOverView {
	sayadNo: string;
	seri: string;
	serial: string;
	amount: number;
	dueDate: string;
	reason: string;
	reasonDescription: string;
	description: string;
	toIBAN: string;
	signers: Signer[];
	recievers: Reciever[];
}

interface Reciever {
	name: string;
	shahabNo: string;
	nationalNo: string;
	customerTypeDescription: string;
}

interface Signer {
	groupNumber: string;
	withdrawalGroups: WithdrawalGroup[];
}

interface WithdrawalGroup {
	customerNumber: number;
	name: string;
}
