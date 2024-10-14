import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import GiveBackChequeVerifyOtpCommand from 'business/application/cheque/giveBackCheck/GiveBackChequeVerifyOtp/GiveBackChequeVerifyOtpCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { GiveBackChequeVerifyOtpRequest } from 'common/entities/cheque/GivebackCheck/GiveBackChequeVerifyOtp/GiveBackChequeVerifyOtpRequest';
import { GiveBackChequeVerifyOtpResponse } from 'common/entities/cheque/GivebackCheck/GiveBackChequeVerifyOtp/GiveBackChequeVerifyOtpResponse';

const mediator = new Mediator();

export default function useGiveBackChequeVerifyOtp() {
	return useMutation<
		GiveBackChequeVerifyOtpResponse,
		ErrorType<GiveBackChequeVerifyOtpRequest>,
		GiveBackChequeVerifyOtpCommand
	>({
		mutationFn: (data: GiveBackChequeVerifyOtpCommand) =>
			mediator.send<GiveBackChequeVerifyOtpResponse>(new GiveBackChequeVerifyOtpCommand(data)),
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
