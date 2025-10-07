import { IRequestHandler, requestHandler } from '@Mediatr/index';
import IssueWithDrawalGroupsCommand from 'business/application/cheque/Digital Cheque/Issue With drawal groups/IssueWithDrawalGroupsCommand';
import APIClient from 'business/infrastructure/api-client';
import { IssueChequeIssueWithDrawalGroup } from 'business/infrastructure/end-points';

@requestHandler(IssueWithDrawalGroupsCommand)
export class IssueWithDrawalGroupsCommandHandler implements IRequestHandler<any, any> {
	handle(command: IssueWithDrawalGroupsCommand): Promise<any> {
		const apiClient = new APIClient<any, any>(IssueChequeIssueWithDrawalGroup);
		return apiClient.post(command.payload);
	}
}