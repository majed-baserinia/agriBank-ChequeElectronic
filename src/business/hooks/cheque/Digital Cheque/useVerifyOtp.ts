import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import VerifyOtpCommand from 'business/application/cheque/Digital Cheque/Verify Otp/VerifyOtpCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { VerifyOtpRequest } from 'common/entities/cheque/Digital Cheque/Verify Otp/VerifyOtpRequest';
import { VerifyOtpResponse } from 'common/entities/cheque/Digital Cheque/Verify Otp/VerifyOtpResponse';

const mediator = new Mediator();

export default function useVerifyOtp() {
	return useMutation<VerifyOtpResponse, ErrorType<VerifyOtpRequest>, VerifyOtpCommand>({
		mutationFn: (data: VerifyOtpCommand) => mediator.send<VerifyOtpResponse>(new VerifyOtpCommand(data)),
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
