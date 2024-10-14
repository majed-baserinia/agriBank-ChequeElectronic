import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import RejectTransferChequeVerifyOtpCommand from 'business/application/cheque/transferCheck/RejectTransferChequeVerifyOtp/RejectTransferChequeVerifyOtpCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { RejectTransferChequeVerifyOtpRequest } from 'common/entities/cheque/transferCheck/RejectTransferChequeVerifyOtp/RejectTransferChequeVerifyOtpRequest';
import { RejectTransferChequeVerifyOtpResponse } from 'common/entities/cheque/transferCheck/RejectTransferChequeVerifyOtp/RejectTransferChequeVerifyOtpResponse';

const mediator = new Mediator();

export default function useRejectTransferChequeVerifyOtp() {
	return useMutation<
		RejectTransferChequeVerifyOtpResponse,
		ErrorType<RejectTransferChequeVerifyOtpRequest>,
		RejectTransferChequeVerifyOtpCommand
	>({
		mutationFn: (data: RejectTransferChequeVerifyOtpCommand) =>
			mediator.send<RejectTransferChequeVerifyOtpResponse>(new RejectTransferChequeVerifyOtpCommand(data)),
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
