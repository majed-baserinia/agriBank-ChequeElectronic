import { IRequest } from '@Mediatr/index';
import { RejectGiveBackChequeInitiateOtpResponse } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeInitiateOtp/RejectGiveBackChequeInitiateOtpResponse';

export default class RejectGiveBackChequeInitiateOtpCommand
	implements IRequest<RejectGiveBackChequeInitiateOtpResponse>
{
	transferChequeKey: string;

	constructor(formData: RejectGiveBackChequeInitiateOtpCommand) {
		this.transferChequeKey = formData.transferChequeKey;
	}
}
