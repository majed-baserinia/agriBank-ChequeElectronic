import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import RejectTransferChequeInitiateCommand from 'business/application/cheque/transferCheck/RejectTransferChequeInitiate/RejectTransferChequeInitiateCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { RejectTransferChequeInitiateRequest } from 'common/entities/cheque/transferCheck/RejectTransferChequeInitiate/RejectTransferChequeInitiateRequest';
import { RejectTransferChequeInitiateResponse } from 'common/entities/cheque/transferCheck/RejectTransferChequeInitiate/RejectTransferChequeInitiateResponse';

const mediator = new Mediator();

export default function useRejectTransferChequeInitiate() {
	return useMutation<
		RejectTransferChequeInitiateResponse,
		ErrorType<RejectTransferChequeInitiateRequest>,
		RejectTransferChequeInitiateCommand
	>({
		mutationFn: (data: RejectTransferChequeInitiateCommand) =>
			mediator.send<RejectTransferChequeInitiateResponse>(new RejectTransferChequeInitiateCommand(data)),
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
