import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { RejectTransferChequeVerifyOtp } from 'business/infrastructure/end-points';
import { RejectTransferChequeVerifyOtpRequest } from 'common/entities/cheque/transferCheck/RejectTransferChequeVerifyOtp/RejectTransferChequeVerifyOtpRequest';
import { RejectTransferChequeVerifyOtpResponse } from 'common/entities/cheque/transferCheck/RejectTransferChequeVerifyOtp/RejectTransferChequeVerifyOtpResponse';
import RejectTransferChequeVerifyOtpCommand from './RejectTransferChequeVerifyOtpCommand';

@requestHandler(RejectTransferChequeVerifyOtpCommand)
export class RejectTransferChequeVerifyOtpCommandHandler
	implements IRequestHandler<RejectTransferChequeVerifyOtpCommand, RejectTransferChequeVerifyOtpResponse>
{
	handle(value: RejectTransferChequeVerifyOtpCommand): Promise<RejectTransferChequeVerifyOtpResponse> {
		const apiClient = new APIClient<RejectTransferChequeVerifyOtpRequest, RejectTransferChequeVerifyOtpResponse>(
			RejectTransferChequeVerifyOtp
		);
		return apiClient.post(<RejectTransferChequeVerifyOtpRequest>{
			transferChequeKey: value.transferChequeKey,
			otpCode: value.otpCode,
			selectSingleSignatureLegal: value.selectSingleSignatureLegal
		});
	}
}
