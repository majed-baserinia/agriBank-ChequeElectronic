import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import IssueChequeInitiateOtpCommand from 'business/application/cheque/Digital Cheque/IssuechequeinitiateOtp/IssuechequeinitiateOtpCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { CheckInitiateOtpRequest } from 'common/entities/cheque/Digital Cheque/CheckInitiateOtp/CheckInitiateOtpRequest';
import { CheckInitiateOtpResponse } from 'common/entities/cheque/Digital Cheque/CheckInitiateOtp/CheckInitiateOtpResponse';
import 'business/application/cheque/Digital Cheque/IssuechequeinitiateOtp/IssuechequeinitiateOtpHandler'

const mediator = new Mediator();

export default function useIssueChequeInitiateOtp() {
	return useMutation<
		CheckInitiateOtpResponse,
		ErrorType<CheckInitiateOtpRequest>,
		IssueChequeInitiateOtpCommand
	>({
		mutationFn: (data: IssueChequeInitiateOtpCommand) =>
			mediator.send<CheckInitiateOtpResponse>(new IssueChequeInitiateOtpCommand(data)),
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
