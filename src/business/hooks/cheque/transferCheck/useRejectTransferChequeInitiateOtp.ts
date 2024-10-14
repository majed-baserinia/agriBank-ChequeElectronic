import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import RejectTransferChequeInitiateOtpCommand from 'business/application/cheque/transferCheck/RejectTransferChequeInitiateOtp/RejectTransferChequeInitiateOtpCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { RejectTransferChequeInitiateOtpRequest } from 'common/entities/cheque/transferCheck/RejectTransferChequeInitiateOtp/RejectTransferChequeInitiateOtpRequest';
import { RejectTransferChequeInitiateOtpResponse } from 'common/entities/cheque/transferCheck/RejectTransferChequeInitiateOtp/RejectTransferChequeInitiateOtpResponse';

const mediator = new Mediator();

export default function useRejectTransferChequeInitiateOtp() {
	return useMutation<
		RejectTransferChequeInitiateOtpResponse,
		ErrorType<RejectTransferChequeInitiateOtpRequest>,
		RejectTransferChequeInitiateOtpCommand
	>({
		mutationFn: (data: RejectTransferChequeInitiateOtpCommand) =>
			mediator.send<RejectTransferChequeInitiateOtpResponse>(new RejectTransferChequeInitiateOtpCommand(data)),
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
