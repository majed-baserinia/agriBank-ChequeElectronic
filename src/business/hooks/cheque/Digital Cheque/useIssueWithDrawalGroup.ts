import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import IssueWithDrawalGroupsCommand from 'business/application/cheque/Digital Cheque/Issue With drawal groups/IssueWithDrawalGroupsCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { IssueWithGroupRequest } from 'common/entities/cheque/Digital Cheque/Issue Groups/IssueWithGroupRequest';
import { IssueWithGroupResponse } from 'common/entities/cheque/Digital Cheque/Issue Groups/IssueWithGroupResponse';

const mediator = new Mediator();

export default function useIssueWithDrawalGroup() {
	return useMutation<IssueWithGroupResponse, ErrorType<IssueWithGroupRequest>, IssueWithDrawalGroupsCommand>({
		mutationFn: (data: IssueWithDrawalGroupsCommand) =>
			mediator.send<IssueWithGroupResponse>(new IssueWithDrawalGroupsCommand(data)),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (data) => {
			return () => data;
		},
		onError: (_, variables) => {
			return () => variables;
		}
	});
}
