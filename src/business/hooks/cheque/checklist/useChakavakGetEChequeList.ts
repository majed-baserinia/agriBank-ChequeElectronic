import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import ChakavakGetEChequeListCommand from 'business/application/cheque/checkList/ChakavakGetEChequeList/ChakavakGetEChequeListCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { ChakavakGetEChequeListRequest } from 'common/entities/cheque/chekList/ChakavakGetEChequeList/ChakavakGetEChequeListRequest';
import { ChakavakGetEChequeListResponse } from 'common/entities/cheque/chekList/ChakavakGetEChequeList/ChakavakGetEChequeListResponse';

const mediator = new Mediator();

export default function useChakavakGetEChequeList() {
	return useMutation<
		ChakavakGetEChequeListResponse,
		ErrorType<ChakavakGetEChequeListRequest>,
		ChakavakGetEChequeListCommand
	>({
		mutationFn: (data: ChakavakGetEChequeListCommand) =>
			mediator.send<ChakavakGetEChequeListResponse>(new ChakavakGetEChequeListCommand(data)),
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
