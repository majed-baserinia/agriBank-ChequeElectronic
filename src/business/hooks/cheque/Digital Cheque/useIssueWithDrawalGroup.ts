import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import IssueWithDrawalGroupsCommand from 'business/application/cheque/Digital Cheque/Issue With drawal groups/IssueWithDrawalGroupsCommand';
import 'business/application/cheque/Digital Cheque/Issue With drawal groups/IssueWithDrawalGroupsCommandHandler'
const mediator = new Mediator();

export default function useIssueWithDrawalGroup() {
	return useMutation({
		mutationFn: (data: any) => mediator.send(new IssueWithDrawalGroupsCommand(data)),
	});
}