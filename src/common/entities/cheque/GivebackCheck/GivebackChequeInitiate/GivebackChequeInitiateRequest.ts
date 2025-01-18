export interface GivebackChequeInitiateRequest {
	customerNumber: number;
	sayadNo: string;
	description: string;
	toIban: string;
}
