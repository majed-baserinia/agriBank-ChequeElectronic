import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import ThirdStepCommand from 'business/application/cheque/activation/thirthStep/ThirdStepCommand';
import ThirdStepRequest from 'common/entities/cheque/activation/thirdStep/ThirdStepRequest';
import ThirdStepResponse from 'common/entities/cheque/activation/thirdStep/ThirdStepResponse';
import { ErrorType } from 'common/entities/ErrorType';

const mediator = new Mediator();
const useThirdStepCall = () => {
	return useMutation<ThirdStepResponse, ErrorType<ThirdStepRequest>, ThirdStepCommand>({
		mutationFn: (data: ThirdStepCommand) => mediator.send<ThirdStepResponse>(new ThirdStepCommand(data)),
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
export default useThirdStepCall;
