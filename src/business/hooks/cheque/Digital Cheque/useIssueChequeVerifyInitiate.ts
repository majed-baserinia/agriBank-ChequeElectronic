import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import IssueChequeVerifyInitiateCommand from 'business/application/cheque/Digital Cheque/IssueChequeVerifyInitiate/IssueChequeVerifyInitiateCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { IssueChequeVerifyInitiateRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeVerifyInitiate/IssueChequeVerifyInitiateRequet';
import { IssueChequeVerifyInitiateResponse } from 'common/entities/cheque/Digital Cheque/IssueChequeVerifyInitiate/IssueChequeVerifyInitiateResponse';

const mediator = new Mediator();

export default function useIssueChequeVerifyInitiate() {
	return useMutation<
		IssueChequeVerifyInitiateResponse,
		ErrorType<IssueChequeVerifyInitiateRequest>,
		IssueChequeVerifyInitiateCommand
	>({
		mutationFn: (data: IssueChequeVerifyInitiateCommand) =>
			mediator.send<IssueChequeVerifyInitiateResponse>(new IssueChequeVerifyInitiateCommand(data)),
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
