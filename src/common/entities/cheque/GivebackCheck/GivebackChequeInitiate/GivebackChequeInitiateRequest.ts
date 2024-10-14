export interface GivebackChequeInitiateRequest {
	customerNumber: number;
	sayadNo: number;
	description: string;
	toIban: string;
}
