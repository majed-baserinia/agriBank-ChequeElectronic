import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { IssueChequeInitiateOtp } from 'business/infrastructure/end-points';
import { CheckInitiateOtpRequest } from 'common/entities/cheque/Digital Cheque/CheckInitiateOtp/CheckInitiateOtpRequest';
import { CheckInitiateOtpResponse } from 'common/entities/cheque/Digital Cheque/CheckInitiateOtp/CheckInitiateOtpResponse';
import IssueChequeInitiateOtpCommand from './IssuechequeinitiateOtpCommand';

@requestHandler(IssueChequeInitiateOtpCommand)
export class IssueChequeInitiateSignatureCommandHandler
	implements IRequestHandler<IssueChequeInitiateOtpCommand, CheckInitiateOtpResponse> {
	handle(value: IssueChequeInitiateOtpCommand): Promise<CheckInitiateOtpResponse> {
		const apiClient = new APIClient<CheckInitiateOtpRequest, CheckInitiateOtpResponse>(
			IssueChequeInitiateOtp
		);
		return apiClient.post(<CheckInitiateOtpRequest>{
			issueChequeKey: value.issueChequeKey
		});
	}
}
