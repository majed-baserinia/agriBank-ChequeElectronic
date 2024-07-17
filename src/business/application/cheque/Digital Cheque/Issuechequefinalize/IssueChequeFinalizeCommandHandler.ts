import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { IssueChequeFinalize } from 'business/infrastructure/end-points';
import { IssueChequeFinalizeRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeFinalize/IssueChequeFinalizeRequest';
import { IssueChequeFinalizeResponse } from 'common/entities/cheque/Digital Cheque/IssueChequeFinalize/IssueChequeFinalizeResponse';
import IssueChequeFinalizeCommand from './IssueChequeFinalizeCommand';

@requestHandler(IssueChequeFinalizeCommand)
export class IssueChequeFinalizeCommandHandler
	implements IRequestHandler<IssueChequeFinalizeCommand, IssueChequeFinalizeResponse>
{
	handle(value: IssueChequeFinalizeCommand): Promise<IssueChequeFinalizeResponse> {
		const apiClient = new APIClient<IssueChequeFinalizeRequest, IssueChequeFinalizeResponse>(IssueChequeFinalize);
		return apiClient.post(<IssueChequeFinalizeRequest>{
			issueChequeKey: value.issueChequeKey
		});
	}
}
