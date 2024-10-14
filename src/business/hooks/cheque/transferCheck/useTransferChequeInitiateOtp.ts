import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import TransferChequeInitiateOtpCommand from 'business/application/cheque/transferCheck/TransferChequeInitiateOtp/TransferChequeInitiateOtpCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { TransferChequeInitiateOtpRequest } from 'common/entities/cheque/transferCheck/TransferChequeInitiateOtp/TransferChequeInitiateOtpRequest';
import { TransferChequeInitiateOtpResponse } from 'common/entities/cheque/transferCheck/TransferChequeInitiateOtp/TransferChequeInitiateOtpResponse';

const mediator = new Mediator();

export default function useTransferChequeInitiateOtp() {
	return useMutation<
		TransferChequeInitiateOtpResponse,
		ErrorType<TransferChequeInitiateOtpRequest>,
		TransferChequeInitiateOtpCommand
	>({
		mutationFn: (data: TransferChequeInitiateOtpCommand) =>
			mediator.send<TransferChequeInitiateOtpResponse>(new TransferChequeInitiateOtpCommand(data)),
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
