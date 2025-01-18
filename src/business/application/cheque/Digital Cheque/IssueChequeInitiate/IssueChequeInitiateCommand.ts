import { IRequest } from '@Mediatr/index';
import { RecieverRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { IssueChequeInitiateResponse } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateResponse';

export default class IssueChequeInitiateCommand implements IRequest<IssueChequeInitiateResponse> {
	sayadNo: string;
	amount: number;
	dueDate: string;
	description: string;
	reason: string;
	toIban?: string;
	recievers: RecieverRequest[];

	constructor(InqueryNationalIdCommand: IssueChequeInitiateCommand) {
		this.sayadNo = InqueryNationalIdCommand.sayadNo;
		this.amount = InqueryNationalIdCommand.amount;
		this.dueDate = InqueryNationalIdCommand.dueDate;
		this.description = InqueryNationalIdCommand.description;
		this.reason = InqueryNationalIdCommand.reason;
		this.recievers = InqueryNationalIdCommand.recievers;
		this.toIban = InqueryNationalIdCommand.toIban;
	}
}
