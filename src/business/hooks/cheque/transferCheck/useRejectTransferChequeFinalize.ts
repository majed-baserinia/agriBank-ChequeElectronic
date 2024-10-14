import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import RejectTransferChequeFinalizeCommand from 'business/application/cheque/transferCheck/RejectTransferChequeFinalize/RejectTransferChequeFinalizeCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { RejectTransferChequeFinalizeRequest } from 'common/entities/cheque/transferCheck/RejectTransferChequeFinalize/RejectTransferChequeFinalizeRequest';
import { RejectTransferChequeFinalizeResponse } from 'common/entities/cheque/transferCheck/RejectTransferChequeFinalize/RejectTransferChequeFinalizeResponse';

const mediator = new Mediator();

export default function useRejectTransferChequeFinalize() {
	return useMutation<
		RejectTransferChequeFinalizeResponse,
		ErrorType<RejectTransferChequeFinalizeRequest>,
		RejectTransferChequeFinalizeCommand
	>({
		mutationFn: (data: RejectTransferChequeFinalizeCommand) =>
			mediator.send<RejectTransferChequeFinalizeResponse>(new RejectTransferChequeFinalizeCommand(data)),
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
