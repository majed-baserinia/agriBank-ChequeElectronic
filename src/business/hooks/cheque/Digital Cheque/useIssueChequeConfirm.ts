import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import IssueChequeConfirmCommand from 'business/application/cheque/Digital Cheque/IssueChequeConfirm/IssueChequeconfirmCommand';
import "business/application/cheque/Digital Cheque/IssueChequeConfirm/IssueChequeconfirmHandler"

const mediator = new Mediator();

export default function useIssueChequeConfirm() {
	return useMutation<any, any, any>({
		mutationFn: (data: IssueChequeConfirmCommand) =>
			mediator.send<any>(new IssueChequeConfirmCommand(data)),
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
