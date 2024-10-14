import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { issuechequeinitiate } from 'business/infrastructure/end-points';
import { IssueChequeInitiateRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { IssueChequeInitiateResponse } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateResponse';
import IssueChequeInitiateCommand from './IssueChequeInitiateCommand';

@requestHandler(IssueChequeInitiateCommand)
export class IssueChequeInitiateCommandHandler
	implements IRequestHandler<IssueChequeInitiateCommand, IssueChequeInitiateResponse>
{
	handle(value: IssueChequeInitiateCommand): Promise<IssueChequeInitiateResponse> {
		const apiClient = new APIClient<IssueChequeInitiateRequest, IssueChequeInitiateResponse>(issuechequeinitiate);
		return apiClient.post(<IssueChequeInitiateRequest>{
			sayadNo: value.sayadNo,
			amount: value.amount,
			dueDate: value.dueDate,
			description: value.description,
			reason: value.reason,
			recievers: value.recievers,
			toIban: value.toIban
		});
	}
}
