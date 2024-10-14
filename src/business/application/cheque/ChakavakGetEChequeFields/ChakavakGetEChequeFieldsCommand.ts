import { IRequest } from '@Mediatr/index';
import { ChakavakGetEChequeFieldsResponse } from 'common/entities/cheque/ChakavakGetEChequeFields/ChakavakGetEChequeFieldsResponse';

export default class ChakavakGetEChequeFieldsCommand implements IRequest<ChakavakGetEChequeFieldsResponse> {
	CustomerNo: number;
	Id: string;

	constructor(input: ChakavakGetEChequeFieldsCommand) {
		this.CustomerNo = input.CustomerNo;
		this.Id = input.Id;
	}
}
