export interface CustomerCurrentAccountsRequest {
	issueChequeKey: string;
	otpCode: string;
	signSingleSignatureLegal: boolean;
}
