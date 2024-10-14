import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import ChakavakGetEChequeFieldsCommand from 'business/application/cheque/ChakavakGetEChequeFields/ChakavakGetEChequeFieldsCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { ChakavakGetEChequeFieldsRequest } from 'common/entities/cheque/ChakavakGetEChequeFields/ChakavakGetEChequeFieldsRequest';
import { ChakavakGetEChequeFieldsResponse } from 'common/entities/cheque/ChakavakGetEChequeFields/ChakavakGetEChequeFieldsResponse';

const mediator = new Mediator();

export default function useChakavakGetEChequeFields() {
	return useMutation<
		ChakavakGetEChequeFieldsResponse,
		ErrorType<ChakavakGetEChequeFieldsRequest>,
		ChakavakGetEChequeFieldsCommand
	>({
		mutationFn: (data: ChakavakGetEChequeFieldsCommand) =>
			mediator.send<ChakavakGetEChequeFieldsResponse>(new ChakavakGetEChequeFieldsCommand(data)),
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
