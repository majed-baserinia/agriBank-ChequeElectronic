import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import FirstStepCommand from 'business/application/cheque/activation/firstStep/FirstStepCommand';
import FirstStepRequest from 'common/entities/cheque/activation/firstStep/FirstStepRequest';
import FirstStepResponse from 'common/entities/cheque/activation/firstStep/FirstStepResponse';
import { ErrorType } from 'common/entities/ErrorType';

const mediator = new Mediator();
const useFirstStepCall = () => {
	return useMutation<FirstStepResponse, ErrorType<FirstStepRequest>, FirstStepCommand>({
		mutationFn: (data: FirstStepCommand) => mediator.send<FirstStepResponse>(new FirstStepCommand(data)),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (data) => {
			return () => data;
		},
		onError: (error, variables) => {
			return variables;
		}
	});
};
export default useFirstStepCall;
