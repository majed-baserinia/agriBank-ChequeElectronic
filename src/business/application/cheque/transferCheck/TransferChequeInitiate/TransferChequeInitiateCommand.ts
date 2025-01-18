import { IRequest } from '@Mediatr/index';
import { RecieverRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { TransferChequeInitiateResponse } from 'common/entities/cheque/transferCheck/TransferChequeInitiate/TransferChequeInitiateResponse';

export default class TransferChequeInitiateCommand implements IRequest<TransferChequeInitiateResponse> {
	customerNumber: number;
	sayadNo: string;
	description: string;
	reason: string;
	toIban?: string;
	receivers: RecieverRequest[];

	constructor(input: TransferChequeInitiateCommand) {
		this.customerNumber = input.customerNumber;
		this.sayadNo = input.sayadNo;
		this.description = input.description;
		this.reason = input.reason;
		this.toIban = input.toIban;
		this.receivers = input.receivers;
	}
}
