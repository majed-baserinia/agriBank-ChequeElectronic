import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import GiveBackChequeInitiateOtpCommand from 'business/application/cheque/giveBackCheck/GiveBackChequeInitiateOtp/GiveBackChequeInitiateOtpCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { GiveBackChequeInitiateOtpRequest } from 'common/entities/cheque/GivebackCheck/GiveBackChequeInitiateOtp/GiveBackChequeInitiateOtpRequest';
import { GiveBackChequeInitiateOtpResponse } from 'common/entities/cheque/GivebackCheck/GiveBackChequeInitiateOtp/GiveBackChequeInitiateOtpResponse';

const mediator = new Mediator();

export default function useGiveBackChequeInitiateOtp() {
	return useMutation<
		GiveBackChequeInitiateOtpResponse,
		ErrorType<GiveBackChequeInitiateOtpRequest>,
		GiveBackChequeInitiateOtpCommand
	>({
		mutationFn: (data: GiveBackChequeInitiateOtpCommand) =>
			mediator.send<GiveBackChequeInitiateOtpResponse>(new GiveBackChequeInitiateOtpCommand(data)),
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
