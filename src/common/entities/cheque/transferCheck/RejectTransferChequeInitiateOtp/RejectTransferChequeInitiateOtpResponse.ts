export interface RejectTransferChequeInitiateOtpResponse {
	transferChequeKey: string;
	message: string;
	lifeTime: number;
	codeLength: number;
}
