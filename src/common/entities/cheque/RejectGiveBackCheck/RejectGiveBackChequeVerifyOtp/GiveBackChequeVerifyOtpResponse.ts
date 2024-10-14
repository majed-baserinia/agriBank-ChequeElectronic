export interface RejectGiveBackChequeVerifyOtpResponse {
	transferChequeKey: string;
	transferChequeOverView: TransferChequeOverView;
}

type TransferChequeOverView = {
	sayadNo: number;
	description: string;
	toIban: string;
	signers: Signers[];
};

type Signers = {
	groupNumber: string;
	withdrawalGroups: WithdrawalGroups[];
};

type WithdrawalGroups = {
	customerNumber: number;
	name: string;
};
