export interface RejectTransferChequeInitiateRequest {
	customerNumber: number;
	sayadNo: string;
	description: string;
	reason: string;
	toIban: string;
	recievers: Reciever[];
}
type Reciever = {
	name: string;
	shahabNo: string;
	nationalNo: string;
	customerType: number;
};
