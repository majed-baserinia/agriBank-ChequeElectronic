import { IRequest } from '@Mediatr/index';
import { CheckInitiateOtpResponse } from 'common/entities/cheque/Digital Cheque/CheckInitiateOtp/CheckInitiateOtpResponse';

export default class IssueChequeInitiateOtpCommand implements IRequest<CheckInitiateOtpResponse> {
	issueChequeKey: string;

	constructor(IssueChequeInitiateSignatureCommand: IssueChequeInitiateOtpCommand) {
		this.issueChequeKey = IssueChequeInitiateSignatureCommand.issueChequeKey;
	}
}
