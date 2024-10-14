import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import RejectGiveBackChequeVerifyOtpCommand from 'business/application/cheque/rejectGiveBackCheck/RejectGiveBackChequeVerifyOtp/RejectGiveBackChequeVerifyOtpCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { RejectGiveBackChequeVerifyOtpRequest } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeVerifyOtp/GiveBackChequeVerifyOtpRequest';
import { RejectGiveBackChequeVerifyOtpResponse } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeVerifyOtp/GiveBackChequeVerifyOtpResponse';

const mediator = new Mediator();

export default function useRejectGiveBackChequeVerifyOtp() {
	return useMutation<
		RejectGiveBackChequeVerifyOtpResponse,
		ErrorType<RejectGiveBackChequeVerifyOtpRequest>,
		RejectGiveBackChequeVerifyOtpCommand
	>({
		mutationFn: (data: RejectGiveBackChequeVerifyOtpCommand) =>
			mediator.send<RejectGiveBackChequeVerifyOtpResponse>(new RejectGiveBackChequeVerifyOtpCommand(data)),
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
