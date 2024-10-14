import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import RejectGiveBackChequeFinalizeCommand from 'business/application/cheque/rejectGiveBackCheck/RejectGiveBackChequeFinalize/RejectGiveBackChequeFinalizeCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { RejectGiveBackChequeFinalizeRequest } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeFinalize/RejectGiveBackChequeFinalizeRequest';
import { RejectGiveBackChequeFinalizeResponse } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeFinalize/RejectGiveBackChequeFinalizeResponse';

const mediator = new Mediator();

export default function useRejectGiveBackChequeFinalize() {
	return useMutation<
		RejectGiveBackChequeFinalizeResponse,
		ErrorType<RejectGiveBackChequeFinalizeRequest>,
		RejectGiveBackChequeFinalizeCommand
	>({
		mutationFn: (data: RejectGiveBackChequeFinalizeCommand) =>
			mediator.send<RejectGiveBackChequeFinalizeResponse>(new RejectGiveBackChequeFinalizeCommand(data)),
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
