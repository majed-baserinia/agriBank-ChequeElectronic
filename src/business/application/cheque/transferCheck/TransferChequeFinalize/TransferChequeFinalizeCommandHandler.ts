import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { TransferChequeFinalize } from 'business/infrastructure/end-points';
import { TransferChequeFinalizeRequest } from 'common/entities/cheque/transferCheck/TransferChequeFinalize/TransferChequeFinalizeRequest';
import { TransferChequeFinalizeResponse } from 'common/entities/cheque/transferCheck/TransferChequeFinalize/TransferChequeFinalizeResponse';
import TransferChequeFinalizeCommand from './TransferChequeFinalizeCommand';

@requestHandler(TransferChequeFinalizeCommand)
export class TransferChequeFinalizeCommandHandler
	implements IRequestHandler<TransferChequeFinalizeCommand, TransferChequeFinalizeResponse>
{
	handle(value: TransferChequeFinalizeCommand): Promise<TransferChequeFinalizeResponse> {
		const apiClient = new APIClient<TransferChequeFinalizeRequest, TransferChequeFinalizeResponse>(
			TransferChequeFinalize
		);
		return apiClient.post(<TransferChequeFinalizeRequest>{
			transferChequeKey: value.transferChequeKey
		});
	}
}
