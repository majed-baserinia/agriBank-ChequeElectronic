import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import IssueChequeInitiateCommand from 'business/application/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { IssueChequeInitiateRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { IssueChequeInitiateResponse } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateResponse';

const mediator = new Mediator();

export default function useIssueChequeInitiate() {
	return useMutation<IssueChequeInitiateResponse, ErrorType<IssueChequeInitiateRequest>, IssueChequeInitiateCommand>({
		mutationFn: (data: IssueChequeInitiateCommand) =>
			mediator.send<IssueChequeInitiateResponse>(new IssueChequeInitiateCommand(data)),
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
