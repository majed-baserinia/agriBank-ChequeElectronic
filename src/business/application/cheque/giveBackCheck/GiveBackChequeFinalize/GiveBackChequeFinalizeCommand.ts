import { IRequest } from '@Mediatr/index';
import { GiveBackChequeFinalizeResponse } from 'common/entities/cheque/GivebackCheck/GiveBackChequeFinalize/GiveBackChequeFinalizeResponse';

export default class GiveBackChequeFinalizeCommand implements IRequest<GiveBackChequeFinalizeResponse> {
	transferChequeKey: string;

	constructor(formData: GiveBackChequeFinalizeCommand) {
		this.transferChequeKey = formData.transferChequeKey;
	}
}
