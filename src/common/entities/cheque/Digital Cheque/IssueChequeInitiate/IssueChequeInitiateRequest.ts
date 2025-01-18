export interface IssueChequeInitiateRequest {
	sayadNo: string;
	amount: number;
	dueDate: string;
	description: string;
	reason: string;
	toIban?: string;
	recievers: RecieverRequest[];
}

export type RecieverRequest = {
	name: string;
	shahabNo: string;
	nationalNo: string;
	customerType: 1 | 2 | 3 | 4;
};
