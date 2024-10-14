export interface TransferChequeInitiateOtpResponse {
	transferChequeKey: string;
	message: string;
	lifeTime: number;
	codeLength: number;
}
