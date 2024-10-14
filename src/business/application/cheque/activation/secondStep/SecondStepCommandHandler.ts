import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import SecondStepRequest from 'common/entities/cheque/activation/secondStep/SecondStepRequest';
import SecondStepResponse from 'common/entities/cheque/activation/secondStep/SecondStepResponse';
import SecondStepCommand from './SecondStepCommand';

@requestHandler(SecondStepCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AccountChargeharimCommandHandler implements IRequestHandler<SecondStepCommand, SecondStepResponse> {
	handle(value: SecondStepCommand): Promise<SecondStepResponse> {
		const apiClient = new APIClient<SecondStepRequest, SecondStepResponse>(
			import.meta.env.VITE_APP_ACTIVATION_SECOND_STEP as string
		);
		return apiClient.post(<SecondStepRequest>{
			ActivationKey: value.activationKey
		});
	}
}
