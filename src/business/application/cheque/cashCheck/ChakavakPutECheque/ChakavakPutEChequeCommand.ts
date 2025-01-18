import { IRequest } from '@Mediatr/index';
import { ChakavakPutEChequeResponse } from 'common/entities/cheque/cashCheck/ChakavakPutECheque/ChakavakPutEChequeResponse';

export default class ChakavakPutEChequeCommand implements IRequest<ChakavakPutEChequeResponse> {
	CustomerNo: number;
	Sayad: string;
	SettlementDate: string;
	Creditor_Account: string;
	InstrId: string;
	NonPaymentCertificate: boolean;
	bearerInfo: null;

	constructor(input: ChakavakPutEChequeCommand) {
		this.CustomerNo = input.CustomerNo;
		this.Creditor_Account = input.Creditor_Account;
		this.InstrId = input.InstrId;
		this.NonPaymentCertificate = input.NonPaymentCertificate;
		this.Sayad = input.Sayad;
		this.SettlementDate = input.SettlementDate;
		this.bearerInfo = input.bearerInfo;
	}
}
