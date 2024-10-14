import { IRequest } from '@Mediatr/index';

export default class TransferBasicCheckDataValidatorCommand implements IRequest<object> {
	reason: { value: string; name: string };
	description: string;
	toIban: string;

	constructor(formData: TransferBasicCheckDataValidatorCommand) {
		this.reason = formData?.reason;
		this.description = formData?.description;
		this.toIban = formData?.toIban;
	}
}
