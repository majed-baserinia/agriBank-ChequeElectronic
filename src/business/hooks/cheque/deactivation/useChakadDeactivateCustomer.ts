import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import ChakadDeactivateCustomerCommand from 'business/application/cheque/deactivation/ChakadDeactivateCustomer/ChakadDeactivateCustomerCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { ChakadDeactivateCustomerRequest } from 'common/entities/cheque/deactivation/ChakadDeactivateCustomer/ChakadDeactivateCustomerRequest';
import { ChakadDeactivateCustomerResponse } from 'common/entities/cheque/deactivation/ChakadDeactivateCustomer/ChakadDeactivateCustomerResponse';

const mediator = new Mediator();

export default function useChakadDeactivateCustomer() {
	return useMutation<
		ChakadDeactivateCustomerResponse,
		ErrorType<ChakadDeactivateCustomerRequest>,
		ChakadDeactivateCustomerCommand
	>({
		mutationFn: (data: ChakadDeactivateCustomerCommand) =>
			mediator.send<ChakadDeactivateCustomerResponse>(new ChakadDeactivateCustomerCommand(data)),
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
