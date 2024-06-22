import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { GiveBackChequeFinalize } from 'business/infrastructure/end-points';
import GiveBackChequeFinalizeCommand from './GiveBackChequeFinalizeCommand';
import { GiveBackChequeFinalizeResponse } from 'common/entities/cheque/GivebackCheck/GiveBackChequeFinalize/GiveBackChequeFinalizeResponse';
import { GiveBackChequeFinalizeRequest } from 'common/entities/cheque/GivebackCheck/GiveBackChequeFinalize/GiveBackChequeFinalizeRequest';

@requestHandler(GiveBackChequeFinalizeCommand)
export class GiveBackChequeFinalizeCommandHandler
	implements IRequestHandler<GiveBackChequeFinalizeCommand, GiveBackChequeFinalizeResponse>
{
	handle(value: GiveBackChequeFinalizeCommand): Promise<GiveBackChequeFinalizeResponse> {
		const apiClient = new APIClient<GiveBackChequeFinalizeRequest, GiveBackChequeFinalizeResponse>(
			GiveBackChequeFinalize
		);
		return apiClient.post(<GiveBackChequeFinalizeRequest>{
			transferChequeKey: value.transferChequeKey
		});
	}
}
