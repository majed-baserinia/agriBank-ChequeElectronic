import { IRequest } from '@Mediatr/index';
import { ReceiverInquiryChequeResponse } from 'common/entities/cheque/cashCheck/ReceiverInquiryCheque/ReceiverInquiryChequeResponse';

export default class ReceiverInquiryChequeCommand implements IRequest<ReceiverInquiryChequeResponse> {
	sayadNo: string;

	constructor(input: ReceiverInquiryChequeCommand) {
		this.sayadNo = input.sayadNo;
	}
}
