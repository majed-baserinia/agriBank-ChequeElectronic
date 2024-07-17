import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import IssueChequeFinalizeCommand from 'business/application/cheque/Digital Cheque/Issuechequefinalize/IssueChequeFinalizeCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { IssueChequeFinalizeRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeFinalize/IssueChequeFinalizeRequest';
import { IssueChequeFinalizeResponse } from 'common/entities/cheque/Digital Cheque/IssueChequeFinalize/IssueChequeFinalizeResponse';

const mediator = new Mediator();

export default function useIssueChequeFinalize() {
	return useMutation<IssueChequeFinalizeResponse, ErrorType<IssueChequeFinalizeRequest>, IssueChequeFinalizeCommand>({
		mutationFn: (data: IssueChequeFinalizeCommand) =>
			mediator.send<IssueChequeFinalizeResponse>(new IssueChequeFinalizeCommand(data)),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (data) => {
			return () => data;
		},
		onError: (error, variables) => {
			return () => variables;
		}
	});
}
