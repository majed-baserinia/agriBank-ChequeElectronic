import { IRequest } from '@Mediatr/index';
import { ChakavakUnLockChequeResponse } from 'common/entities/cheque/ChakavakUnLockCheque/ChakavakUnLockChequeResponse';

export default class ChakavakUnLockChequeCommand implements IRequest<ChakavakUnLockChequeResponse> {
	CustomerNo: number;
	Id: string;

	constructor(input: ChakavakUnLockChequeCommand) {
		this.CustomerNo = input.CustomerNo;
		this.Id = input.Id;
	}
}
