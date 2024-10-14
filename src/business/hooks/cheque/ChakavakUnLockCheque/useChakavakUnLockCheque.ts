import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import ChakavakUnLockChequeCommand from 'business/application/cheque/ChakavakUnLockCheque/ChakavakUnLockChequeCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { ChakavakUnLockChequeRequest } from 'common/entities/cheque/ChakavakUnLockCheque/ChakavakUnLockChequeRequest';
import { ChakavakUnLockChequeResponse } from 'common/entities/cheque/ChakavakUnLockCheque/ChakavakUnLockChequeResponse';

const mediator = new Mediator();

export default function useChakavakUnLockCheque() {
	return useMutation<
		ChakavakUnLockChequeResponse,
		ErrorType<ChakavakUnLockChequeRequest>,
		ChakavakUnLockChequeCommand
	>({
		mutationFn: (data: ChakavakUnLockChequeCommand) =>
			mediator.send<ChakavakUnLockChequeResponse>(new ChakavakUnLockChequeCommand(data)),
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
