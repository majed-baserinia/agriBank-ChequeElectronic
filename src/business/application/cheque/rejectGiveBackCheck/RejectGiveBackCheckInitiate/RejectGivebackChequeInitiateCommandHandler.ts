import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { RejectGivebackChequeInitiate } from 'business/infrastructure/end-points';
import { RejectGivebackChequeInitiateRequest } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackCheckInitiate/RejectGiveBackCheckInitiateRequest';
import { RejectGivebackChequeInitiateResponse } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackCheckInitiate/RejectGiveBackCheckInitiateResponse';
import RejectGivebackChequeInitiateCommand from './RejectGivebackChequeInitiateCommand';

@requestHandler(RejectGivebackChequeInitiateCommand)
export class RejectGivebackChequeInitiateCommandHandler
	implements IRequestHandler<RejectGivebackChequeInitiateCommand, RejectGivebackChequeInitiateResponse>
{
	handle(value: RejectGivebackChequeInitiateCommand): Promise<RejectGivebackChequeInitiateResponse> {
		const apiClient = new APIClient<RejectGivebackChequeInitiateRequest, RejectGivebackChequeInitiateResponse>(
			RejectGivebackChequeInitiate
		);
		return apiClient.post(<RejectGivebackChequeInitiateRequest>{
			customerNumber: value.customerNumber,
			sayadNo: value.sayadNo,
			description: value.description,
			toIban: value.toIban
		});
	}
}
