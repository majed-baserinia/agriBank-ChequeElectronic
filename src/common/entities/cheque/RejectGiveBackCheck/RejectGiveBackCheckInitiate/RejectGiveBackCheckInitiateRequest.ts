export interface RejectGivebackChequeInitiateRequest {
	customerNumber: number;
	sayadNo: number;
	description: string;
	toIban: string;
}
