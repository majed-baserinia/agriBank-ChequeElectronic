import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import RejectGiveBackChequeInitiateOtpCommand from 'business/application/cheque/rejectGiveBackCheck/RejectGiveBackChequeInitiateOtp/RejectGiveBackChequeInitiateOtpCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { RejectGiveBackChequeInitiateOtpRequest } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeInitiateOtp/RejectGiveBackChequeInitiateOtpRequest';
import { RejectGiveBackChequeInitiateOtpResponse } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeInitiateOtp/RejectGiveBackChequeInitiateOtpResponse';

const mediator = new Mediator();

export default function useRejectGiveBackChequeInitiateOtp() {
	return useMutation<
		RejectGiveBackChequeInitiateOtpResponse,
		ErrorType<RejectGiveBackChequeInitiateOtpRequest>,
		RejectGiveBackChequeInitiateOtpCommand
	>({
		mutationFn: (data: RejectGiveBackChequeInitiateOtpCommand) =>
			mediator.send<RejectGiveBackChequeInitiateOtpResponse>(new RejectGiveBackChequeInitiateOtpCommand(data)),
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
