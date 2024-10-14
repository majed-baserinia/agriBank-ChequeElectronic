import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { ChakavakUnLockCheque } from 'business/infrastructure/end-points';
import { ChakavakUnLockChequeRequest } from 'common/entities/cheque/ChakavakUnLockCheque/ChakavakUnLockChequeRequest';
import { ChakavakUnLockChequeResponse } from 'common/entities/cheque/ChakavakUnLockCheque/ChakavakUnLockChequeResponse';
import ChakavakUnLockChequeCommand from './ChakavakUnLockChequeCommand';

@requestHandler(ChakavakUnLockChequeCommand)
export class ChakavakUnLockChequeCommandHandler
	implements IRequestHandler<ChakavakUnLockChequeCommand, ChakavakUnLockChequeResponse>
{
	handle(value: ChakavakUnLockChequeCommand): Promise<ChakavakUnLockChequeResponse> {
		const apiClient = new APIClient<ChakavakUnLockChequeRequest, ChakavakUnLockChequeResponse>(
			ChakavakUnLockCheque
		);
		return apiClient.post(<ChakavakUnLockChequeRequest>{
			CustomerNo: value.CustomerNo,
			Id: value.Id
		});
	}
}
