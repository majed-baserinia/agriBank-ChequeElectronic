import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import SecondStepCommand from 'business/application/cheque/activation/secondStep/SecondStepCommand';
import SecondStepRequest from 'common/entities/cheque/activation/secondStep/SecondStepRequest';
import SecondStepResponse from 'common/entities/cheque/activation/secondStep/SecondStepResponse';
import { ErrorType } from 'common/entities/ErrorType';

const mediator = new Mediator();
const useSecondStepCall = () => {
	return useMutation<SecondStepResponse, ErrorType<SecondStepRequest>, SecondStepCommand>({
		mutationFn: (data: SecondStepCommand) => mediator.send<SecondStepResponse>(new SecondStepCommand(data)),
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
export default useSecondStepCall;
