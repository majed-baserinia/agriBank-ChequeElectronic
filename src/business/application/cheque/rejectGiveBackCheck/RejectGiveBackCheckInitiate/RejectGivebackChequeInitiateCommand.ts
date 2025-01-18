import { IRequest } from '@Mediatr/index';
import { RejectGivebackChequeInitiateResponse } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackCheckInitiate/RejectGiveBackCheckInitiateResponse';

export default class RejectGivebackChequeInitiateCommand implements IRequest<RejectGivebackChequeInitiateResponse> {
	customerNumber: number;
	sayadNo: string;
	description: string;
	toIban?: string;

	constructor(formData: RejectGivebackChequeInitiateCommand) {
		this.description = formData.description;
		this.customerNumber = formData.customerNumber;
		this.sayadNo = formData.sayadNo;
		this.toIban = formData?.toIban;
	}
}
