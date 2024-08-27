import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import ChakavakPutEChequeCommand from 'business/application/cheque/cashCheck/ChakavakPutECheque/ChakavakPutEChequeCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { ChakavakPutEChequeRequest } from 'common/entities/cheque/cashCheck/ChakavakPutECheque/ChakavakPutEChequeRequest';
import { ChakavakPutEChequeResponse } from 'common/entities/cheque/cashCheck/ChakavakPutECheque/ChakavakPutEChequeResponse';

const mediator = new Mediator();

export default function useChakavakPutECheque() {
	return useMutation<ChakavakPutEChequeResponse, ErrorType<ChakavakPutEChequeRequest>, ChakavakPutEChequeCommand>({
		mutationFn: (data: ChakavakPutEChequeCommand) =>
			mediator.send<ChakavakPutEChequeResponse>(new ChakavakPutEChequeCommand(data)),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (data) => {
			return () => data;
		},
		onError: (error, variables) => {
			return () => variables;
		}
	});
}
