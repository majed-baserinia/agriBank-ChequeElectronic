import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { Transferchequeinitiateotp } from 'business/infrastructure/end-points';
import { TransferChequeInitiateOtpRequest } from 'common/entities/cheque/transferCheck/TransferChequeInitiateOtp/TransferChequeInitiateOtpRequest';
import { TransferChequeInitiateOtpResponse } from 'common/entities/cheque/transferCheck/TransferChequeInitiateOtp/TransferChequeInitiateOtpResponse';
import TransferChequeInitiateOtpCommand from './TransferChequeInitiateOtpCommand';

@requestHandler(TransferChequeInitiateOtpCommand)
export class TransferChequeInitiateOtpCommandHandler
	implements IRequestHandler<TransferChequeInitiateOtpCommand, TransferChequeInitiateOtpResponse>
{
	handle(value: TransferChequeInitiateOtpCommand): Promise<TransferChequeInitiateOtpResponse> {
		const apiClient = new APIClient<TransferChequeInitiateOtpRequest, TransferChequeInitiateOtpResponse>(
			Transferchequeinitiateotp
		);
		return apiClient.post(<TransferChequeInitiateOtpRequest>{
			transferChequeKey: value.transferChequeKey
		});
	}
}
