import { IRequest } from '@Mediatr/index';
import { RecieverNameInquiryResponse } from 'common/entities/cheque/Digital Cheque/RecieverNameInquiry/RecieverNameInquiryResponse';

export default class RecieverNameInquiryCommand implements IRequest<RecieverNameInquiryResponse> {
	SayadId: string;
	IdType: number;
	IdCode: string;

	constructor(IssueChequeVerifyInitiateCommand: RecieverNameInquiryCommand) {
		this.SayadId = IssueChequeVerifyInitiateCommand.SayadId;
		this.IdType = IssueChequeVerifyInitiateCommand.IdType;
		this.IdCode = IssueChequeVerifyInitiateCommand.IdCode;
	}
}
