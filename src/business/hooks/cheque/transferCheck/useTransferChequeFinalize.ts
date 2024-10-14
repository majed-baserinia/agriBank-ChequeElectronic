import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import TransferChequeFinalizeCommand from 'business/application/cheque/transferCheck/TransferChequeFinalize/TransferChequeFinalizeCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { TransferChequeFinalizeRequest } from 'common/entities/cheque/transferCheck/TransferChequeFinalize/TransferChequeFinalizeRequest';
import { TransferChequeFinalizeResponse } from 'common/entities/cheque/transferCheck/TransferChequeFinalize/TransferChequeFinalizeResponse';

const mediator = new Mediator();

export default function useTransferChequeFinalize() {
	return useMutation<
		TransferChequeFinalizeResponse,
		ErrorType<TransferChequeFinalizeRequest>,
		TransferChequeFinalizeCommand
	>({
		mutationFn: (data: TransferChequeFinalizeCommand) =>
			mediator.send<TransferChequeFinalizeResponse>(new TransferChequeFinalizeCommand(data)),
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
