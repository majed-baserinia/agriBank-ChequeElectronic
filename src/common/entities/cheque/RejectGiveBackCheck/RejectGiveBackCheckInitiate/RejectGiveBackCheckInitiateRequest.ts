export interface RejectGivebackChequeInitiateRequest {
	customerNumber: number;
	sayadNo: string;
	description: string;
	toIban: string;
}
