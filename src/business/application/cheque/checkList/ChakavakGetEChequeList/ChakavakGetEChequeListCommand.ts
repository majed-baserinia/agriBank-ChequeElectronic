import { IRequest } from '@Mediatr/index';
import { ChakavakGetEChequeListResponse } from 'common/entities/cheque/chekList/ChakavakGetEChequeList/ChakavakGetEChequeListResponse';

export default class ChakavakGetEChequeListCommand implements IRequest<ChakavakGetEChequeListResponse> {
	PageNo: number;
	PageSize: number;
	CustomerNo: number;
	AccountNo?: number;
	Serial?: number;
	ChqStatus?: number;

	constructor(input: ChakavakGetEChequeListCommand) {
		this.PageNo = input.PageNo;
		this.PageSize = input.PageSize;
		this.CustomerNo = input.CustomerNo;
		this.AccountNo = input.AccountNo;
		this.Serial = input.Serial;
		this.ChqStatus = input.ChqStatus;
	}
}
