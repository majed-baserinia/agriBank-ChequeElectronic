import { IRequest } from '@Mediatr/index';
import { GetCheckSheetsResponse } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse';

export default class GetChecksheetsCommand implements IRequest<GetCheckSheetsResponse> {
	accountNumber: string;
	startChequeNo: string;
	endChequeNo: string;
	pageNo: number;

	constructor(input: GetChecksheetsCommand) {
		this.accountNumber = input.accountNumber;
		this.startChequeNo = input.startChequeNo;
		this.endChequeNo = input.endChequeNo;
		this.pageNo = input.pageNo;
	}
}
