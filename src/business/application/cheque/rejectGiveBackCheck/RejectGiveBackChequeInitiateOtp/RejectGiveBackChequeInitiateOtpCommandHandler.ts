import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { RejectGiveBackChequeInitiateOtp } from 'business/infrastructure/end-points';
import { RejectGiveBackChequeInitiateOtpRequest } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeInitiateOtp/RejectGiveBackChequeInitiateOtpRequest';
import { RejectGiveBackChequeInitiateOtpResponse } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeInitiateOtp/RejectGiveBackChequeInitiateOtpResponse';
import RejectGiveBackChequeInitiateOtpCommand from './RejectGiveBackChequeInitiateOtpCommand';

@requestHandler(RejectGiveBackChequeInitiateOtpCommand)
export class RejectGiveBackChequeInitiateOtpCommandHandler
	implements IRequestHandler<RejectGiveBackChequeInitiateOtpCommand, RejectGiveBackChequeInitiateOtpResponse>
{
	handle(value: RejectGiveBackChequeInitiateOtpCommand): Promise<RejectGiveBackChequeInitiateOtpResponse> {
		const apiClient = new APIClient<
			RejectGiveBackChequeInitiateOtpRequest,
			RejectGiveBackChequeInitiateOtpResponse
		>(RejectGiveBackChequeInitiateOtp);
		return apiClient.post(<RejectGiveBackChequeInitiateOtpRequest>{
			transferChequeKey: value.transferChequeKey
		});
	}
}
