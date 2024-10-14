import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import IssueChequeInitiateSignatureCommand from 'business/application/cheque/Digital Cheque/Issuechequeinitiatesignature/IssuechequeinitiatesignatureCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { IssueChequeInitiateSignatureRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiateSignature/IssueChequeInitiateSignatureRequest';
import { IssueChequeInitiateSignatureResponse } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiateSignature/IssueChequeInitiateSignatureResponse';

const mediator = new Mediator();

export default function useIssueChequeInitiateSignature() {
	return useMutation<
		IssueChequeInitiateSignatureResponse,
		ErrorType<IssueChequeInitiateSignatureRequest>,
		IssueChequeInitiateSignatureCommand
	>({
		mutationFn: (data: IssueChequeInitiateSignatureCommand) =>
			mediator.send<IssueChequeInitiateSignatureResponse>(new IssueChequeInitiateSignatureCommand(data)),
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
