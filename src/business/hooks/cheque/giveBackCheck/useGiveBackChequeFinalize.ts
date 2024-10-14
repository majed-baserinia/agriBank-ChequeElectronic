import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import GiveBackChequeFinalizeCommand from 'business/application/cheque/giveBackCheck/GiveBackChequeFinalize/GiveBackChequeFinalizeCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { GiveBackChequeFinalizeRequest } from 'common/entities/cheque/GivebackCheck/GiveBackChequeFinalize/GiveBackChequeFinalizeRequest';
import { GiveBackChequeFinalizeResponse } from 'common/entities/cheque/GivebackCheck/GiveBackChequeFinalize/GiveBackChequeFinalizeResponse';

const mediator = new Mediator();

export default function useGiveBackChequeFinalize() {
	return useMutation<
		GiveBackChequeFinalizeResponse,
		ErrorType<GiveBackChequeFinalizeRequest>,
		GiveBackChequeFinalizeCommand
	>({
		mutationFn: (data: GiveBackChequeFinalizeCommand) =>
			mediator.send<GiveBackChequeFinalizeResponse>(new GiveBackChequeFinalizeCommand(data)),
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
