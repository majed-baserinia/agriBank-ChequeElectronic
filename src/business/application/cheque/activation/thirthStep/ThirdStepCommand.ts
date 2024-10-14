import { IRequest } from '@Mediatr/index';
import ActivationChakadCustomerRequest from 'common/entities/cheque/activation/secondStep/SecondStepRequest';
//VITE_APP_INITIAL_CHAKAD
export default class ThirdStepCommand implements IRequest<ActivationChakadCustomerRequest> {
	activationKey: string;

	constructor(ThirdStepCommand: ThirdStepCommand) {
		this.activationKey = ThirdStepCommand?.activationKey;
	}
}
