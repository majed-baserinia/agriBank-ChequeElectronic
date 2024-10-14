import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import TransferChequeInitiateCommand from 'business/application/cheque/transferCheck/TransferChequeInitiate/TransferChequeInitiateCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { TransferChequeInitiateRequest } from 'common/entities/cheque/transferCheck/TransferChequeInitiate/TransferChequeInitiateRequest';
import { TransferChequeInitiateResponse } from 'common/entities/cheque/transferCheck/TransferChequeInitiate/TransferChequeInitiateResponse';

const mediator = new Mediator();

export default function useTransferChequeInitiate() {
	return useMutation<
		TransferChequeInitiateResponse,
		ErrorType<TransferChequeInitiateRequest>,
		TransferChequeInitiateCommand
	>({
		mutationFn: (data: TransferChequeInitiateCommand) =>
			mediator.send<TransferChequeInitiateResponse>(new TransferChequeInitiateCommand(data)),
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
