import { IRequest } from '@Mediatr/index';

export default class CheckInfoFormValidatorCommand implements IRequest<{}> {
	date: Date;
	checkAmount: string;
	reason: { name: string; value: string };
	description: string;

	constructor(formData: CheckInfoFormValidatorCommand) {
		this.date = formData?.date;
		this.checkAmount = formData?.checkAmount;
		this.reason = formData?.reason;
		this.description = formData?.description;
	}
}
