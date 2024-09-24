import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { Chakavakgetechequelist } from 'business/infrastructure/end-points';
import { ChakavakGetEChequeListRequest } from 'common/entities/cheque/chekList/ChakavakGetEChequeList/ChakavakGetEChequeListRequest';
import { ChakavakGetEChequeListResponse } from 'common/entities/cheque/chekList/ChakavakGetEChequeList/ChakavakGetEChequeListResponse';
import ChakavakGetEChequeListCommand from './ChakavakGetEChequeListCommand';

@requestHandler(ChakavakGetEChequeListCommand)
export class ChakavakGetEChequeListCommandHandler
	implements IRequestHandler<ChakavakGetEChequeListCommand, ChakavakGetEChequeListResponse>
{
	handle(value: ChakavakGetEChequeListCommand): Promise<ChakavakGetEChequeListResponse> {
		const apiClient = new APIClient<ChakavakGetEChequeListRequest, ChakavakGetEChequeListResponse>(
			Chakavakgetechequelist
		);
		return apiClient.post(<ChakavakGetEChequeListRequest>{
			AccountNo: value.AccountNo,
			ChqStatus: value.ChqStatus,
			CustomerNo: value.CustomerNo,
			PageNo: value.PageNo,
			PageSize: value.PageSize,
			Serial: value.Serial
		});
	}
}
