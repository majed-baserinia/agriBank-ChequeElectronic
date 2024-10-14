import { IRequest } from '@Mediatr/index';

export default class AddReceiversformValidationCommand implements IRequest<object> {
	name: string;
	shahabNo: string;
	nationalNo: string;

	constructor(formData: AddReceiversformValidationCommand) {
		this.name = formData?.name;
		this.shahabNo = formData?.shahabNo;
		this.nationalNo = formData?.nationalNo;
	}
}
