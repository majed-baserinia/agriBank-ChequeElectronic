import { IRequest } from '@Mediatr/index';
import { GivebackChequeInitiateResponse } from 'common/entities/cheque/GivebackCheck/GivebackChequeInitiate/GivebackChequeInitiateResponse';

export default class GivebackChequeInitiateCommand implements IRequest<GivebackChequeInitiateResponse> {
	customerNumber: number;
	sayadNo: string;
	description: string;
	toIban?: string;

	constructor(formData: GivebackChequeInitiateCommand) {
		this.description = formData.description;
		this.customerNumber = formData.customerNumber;
		this.sayadNo = formData.sayadNo;
		this.toIban = formData?.toIban;
	}
}
