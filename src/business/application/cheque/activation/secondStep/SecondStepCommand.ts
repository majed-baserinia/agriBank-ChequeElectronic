import { IRequest } from '@Mediatr/index';
import SignChakadCustomerRequest from 'common/entities/cheque/activation/secondStep/SecondStepRequest';
//VITE_APP_INITIAL_CHAKAD
export default class SecondStepCommand implements IRequest<SignChakadCustomerRequest> {
	activationKey: string;

	constructor(SecondStepCommand: SecondStepCommand) {
		this.activationKey = SecondStepCommand?.activationKey;
	}
}
