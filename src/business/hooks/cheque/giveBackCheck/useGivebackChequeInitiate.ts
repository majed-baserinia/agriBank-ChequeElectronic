import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import GivebackChequeInitiateCommand from 'business/application/cheque/giveBackCheck/GivebackChequeInitiate/GivebackChequeInitiateCommand';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ErrorType } from 'common/entities/ErrorType';
import { GivebackChequeInitiateRequest } from 'common/entities/cheque/GivebackCheck/GivebackChequeInitiate/GivebackChequeInitiateRequest';
import { GivebackChequeInitiateResponse } from 'common/entities/cheque/GivebackCheck/GivebackChequeInitiate/GivebackChequeInitiateResponse';

const mediator = new Mediator();

export default function useGivebackChequeInitiate() {
	return useMutation<
		GivebackChequeInitiateResponse,
		ErrorType<GivebackChequeInitiateRequest>,
		GivebackChequeInitiateCommand
	>({
		mutationFn: (data: GivebackChequeInitiateCommand) =>
			mediator.send<GivebackChequeInitiateResponse>(new GivebackChequeInitiateCommand(data)),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (data) => {
			return () => data;
		},
		onError: (err) => {
			pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
		}
	});
}
