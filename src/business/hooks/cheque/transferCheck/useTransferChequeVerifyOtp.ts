import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import TransferChequeVerifyOtpCommand from 'business/application/cheque/transferCheck/TransferChequeVerifyOtp/TransferChequeVerifyOtpCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { TransferChequeVerifyOtpRequest } from 'common/entities/cheque/transferCheck/TransferChequeVerifyOtp/TransferChequeVerifyOtpRequest';
import { TransferChequeVerifyOtpResponse } from 'common/entities/cheque/transferCheck/TransferChequeVerifyOtp/TransferChequeVerifyOtpResponse';

const mediator = new Mediator();

export default function useTransferChequeVerifyOtp() {
	return useMutation<
		TransferChequeVerifyOtpResponse,
		ErrorType<TransferChequeVerifyOtpRequest>,
		TransferChequeVerifyOtpCommand
	>({
		mutationFn: (data: TransferChequeVerifyOtpCommand) =>
			mediator.send<TransferChequeVerifyOtpResponse>(new TransferChequeVerifyOtpCommand(data)),
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
