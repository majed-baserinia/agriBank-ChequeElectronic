import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { GiveBackChequeInitiateOtp } from 'business/infrastructure/end-points';
import { GiveBackChequeInitiateOtpRequest } from 'common/entities/cheque/GivebackCheck/GiveBackChequeInitiateOtp/GiveBackChequeInitiateOtpRequest';
import { GiveBackChequeInitiateOtpResponse } from 'common/entities/cheque/GivebackCheck/GiveBackChequeInitiateOtp/GiveBackChequeInitiateOtpResponse';
import GiveBackChequeInitiateOtpCommand from './GiveBackChequeInitiateOtpCommand';

@requestHandler(GiveBackChequeInitiateOtpCommand)
export class GiveBackChequeInitiateOtpCommandHandler
	implements IRequestHandler<GiveBackChequeInitiateOtpCommand, GiveBackChequeInitiateOtpResponse>
{
	handle(value: GiveBackChequeInitiateOtpCommand): Promise<GiveBackChequeInitiateOtpResponse> {
		const apiClient = new APIClient<GiveBackChequeInitiateOtpRequest, GiveBackChequeInitiateOtpResponse>(
			GiveBackChequeInitiateOtp
		);
		return apiClient.post(<GiveBackChequeInitiateOtpRequest>{
			transferChequeKey: value.transferChequeKey
		});
	}
}
