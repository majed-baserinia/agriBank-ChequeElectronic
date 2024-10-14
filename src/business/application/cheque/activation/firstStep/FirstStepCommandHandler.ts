import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import FirstStepRequest from 'common/entities/cheque/activation/firstStep/FirstStepRequest';
import FirstStepResponse from 'common/entities/cheque/activation/firstStep/FirstStepResponse';
import FirstStepCommand from './FirstStepCommand';

@requestHandler(FirstStepCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class FirstStepCommandHandler implements IRequestHandler<FirstStepCommand, FirstStepResponse> {
	handle(value: FirstStepCommand): Promise<FirstStepResponse> {
		const apiClient = new APIClient<FirstStepRequest, FirstStepResponse>(
			import.meta.env.VITE_APP_ACTIVATION_FIRST_STEP as string
		);
		return apiClient.post(<FirstStepRequest>{
			CustomerNumber: value.CustomerNumber
		});
	}
}
