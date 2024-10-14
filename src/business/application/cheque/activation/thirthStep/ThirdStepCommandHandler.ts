import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import ThirdStepRequest from 'common/entities/cheque/activation/thirdStep/ThirdStepRequest';
import ThirdStepResponse from 'common/entities/cheque/activation/thirdStep/ThirdStepResponse';
import ThirdStepCommand from './ThirdStepCommand';

@requestHandler(ThirdStepCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ThirdStepCommandHandler implements IRequestHandler<ThirdStepCommand, ThirdStepResponse> {
	handle(value: ThirdStepCommand): Promise<ThirdStepResponse> {
		const apiClient = new APIClient<ThirdStepRequest, ThirdStepResponse>(
			import.meta.env.VITE_APP_ACTIVATION_THIRD_STEP as string
		);
		return apiClient.post(<ThirdStepRequest>{
			ActivationKey: value.activationKey
		});
	}
}
