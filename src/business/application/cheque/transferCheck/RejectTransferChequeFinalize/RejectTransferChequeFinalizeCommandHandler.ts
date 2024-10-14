import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { RejectTransferChequeFinalize } from 'business/infrastructure/end-points';
import { RejectTransferChequeFinalizeRequest } from 'common/entities/cheque/transferCheck/RejectTransferChequeFinalize/RejectTransferChequeFinalizeRequest';
import { RejectTransferChequeFinalizeResponse } from 'common/entities/cheque/transferCheck/RejectTransferChequeFinalize/RejectTransferChequeFinalizeResponse';
import RejectTransferChequeFinalizeCommand from './RejectTransferChequeFinalizeCommand';

@requestHandler(RejectTransferChequeFinalizeCommand)
export class RejectTransferChequeFinalizeCommandHandler
	implements IRequestHandler<RejectTransferChequeFinalizeCommand, RejectTransferChequeFinalizeResponse>
{
	handle(value: RejectTransferChequeFinalizeCommand): Promise<RejectTransferChequeFinalizeResponse> {
		const apiClient = new APIClient<RejectTransferChequeFinalizeRequest, RejectTransferChequeFinalizeResponse>(
			RejectTransferChequeFinalize
		);
		return apiClient.post(<RejectTransferChequeFinalizeRequest>{
			transferChequeKey: value.transferChequeKey
		});
	}
}
