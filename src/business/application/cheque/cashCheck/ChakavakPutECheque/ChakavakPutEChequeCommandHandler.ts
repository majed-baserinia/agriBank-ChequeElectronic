import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { ChakavakPutECheque } from 'business/infrastructure/end-points';
import { ChakavakPutEChequeRequest } from 'common/entities/cheque/cashCheck/ChakavakPutECheque/ChakavakPutEChequeRequest';
import { ChakavakPutEChequeResponse } from 'common/entities/cheque/cashCheck/ChakavakPutECheque/ChakavakPutEChequeResponse';
import ChakavakPutEChequeCommand from './ChakavakPutEChequeCommand';

@requestHandler(ChakavakPutEChequeCommand)
export class ChakavakPutEChequeCommandHandler
	implements IRequestHandler<ChakavakPutEChequeCommand, ChakavakPutEChequeResponse>
{
	handle(value: ChakavakPutEChequeCommand): Promise<ChakavakPutEChequeResponse> {
		const apiClient = new APIClient<ChakavakPutEChequeRequest, ChakavakPutEChequeResponse>(ChakavakPutECheque);
		return apiClient.post(<ChakavakPutEChequeRequest>{
			bearerInfo: value.bearerInfo,
			Creditor_Account: value.Creditor_Account,
			CustomerNo: value.CustomerNo,
			InstrId: value.InstrId,
			NonPaymentCertificate: value.NonPaymentCertificate,
			Sayad: value.Sayad,
			SettlementDate: value.SettlementDate
		});
	}
}
