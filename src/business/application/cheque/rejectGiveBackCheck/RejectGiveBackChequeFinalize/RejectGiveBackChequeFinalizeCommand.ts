import { IRequest } from '@Mediatr/index';
import { RejectGiveBackChequeFinalizeResponse } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeFinalize/RejectGiveBackChequeFinalizeResponse';

export default class RejectGiveBackChequeFinalizeCommand implements IRequest<RejectGiveBackChequeFinalizeResponse> {
	transferChequeKey: string;

	constructor(formData: RejectGiveBackChequeFinalizeCommand) {
		this.transferChequeKey = formData.transferChequeKey;
	}
}
