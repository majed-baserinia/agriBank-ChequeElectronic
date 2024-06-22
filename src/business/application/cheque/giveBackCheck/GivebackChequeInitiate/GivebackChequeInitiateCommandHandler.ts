import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { GivebackChequeInitiate } from 'business/infrastructure/end-points';
import GivebackChequeInitiateCommand from './GivebackChequeInitiateCommand';
import { GivebackChequeInitiateResponse } from 'common/entities/cheque/GivebackCheck/GivebackChequeInitiate/GivebackChequeInitiateResponse';
import { GivebackChequeInitiateRequest } from 'common/entities/cheque/GivebackCheck/GivebackChequeInitiate/GivebackChequeInitiateRequest';

@requestHandler(GivebackChequeInitiateCommand)
export class GivebackChequeInitiateCommandHandler
	implements IRequestHandler<GivebackChequeInitiateCommand, GivebackChequeInitiateResponse>
{
	handle(value: GivebackChequeInitiateCommand): Promise<GivebackChequeInitiateResponse> {
		const apiClient = new APIClient<GivebackChequeInitiateRequest, GivebackChequeInitiateResponse>(
			GivebackChequeInitiate
		);
		return apiClient.post(<GivebackChequeInitiateRequest>{
			customerNumber: value.customerNumber,
			sayadNo: value.sayadNo,
			description: value.description,
			toIban: value.toIban
		});
	}
}
