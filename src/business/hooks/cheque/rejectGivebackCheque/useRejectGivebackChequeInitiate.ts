import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import RejectGivebackChequeInitiateCommand from 'business/application/cheque/rejectGiveBackCheck/RejectGiveBackCheckInitiate/RejectGivebackChequeInitiateCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { RejectGivebackChequeInitiateRequest } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackCheckInitiate/RejectGiveBackCheckInitiateRequest';
import { RejectGivebackChequeInitiateResponse } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackCheckInitiate/RejectGiveBackCheckInitiateResponse';

const mediator = new Mediator();

export default function useRejectGivebackChequeInitiate() {
	return useMutation<
		RejectGivebackChequeInitiateResponse,
		ErrorType<RejectGivebackChequeInitiateRequest>,
		RejectGivebackChequeInitiateCommand
	>({
		mutationFn: (data: RejectGivebackChequeInitiateCommand) =>
			mediator.send<RejectGivebackChequeInitiateResponse>(new RejectGivebackChequeInitiateCommand(data)),
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
