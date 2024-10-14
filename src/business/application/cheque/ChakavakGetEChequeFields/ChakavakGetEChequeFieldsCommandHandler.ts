import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { ChakavakGetEChequeFields } from 'business/infrastructure/end-points';
import { ChakavakGetEChequeFieldsRequest } from 'common/entities/cheque/ChakavakGetEChequeFields/ChakavakGetEChequeFieldsRequest';
import { ChakavakGetEChequeFieldsResponse } from 'common/entities/cheque/ChakavakGetEChequeFields/ChakavakGetEChequeFieldsResponse';
import ChakavakGetEChequeFieldsCommand from './ChakavakGetEChequeFieldsCommand';

@requestHandler(ChakavakGetEChequeFieldsCommand)
export class ChakavakGetEChequeFieldsCommandHandler
	implements IRequestHandler<ChakavakGetEChequeFieldsCommand, ChakavakGetEChequeFieldsResponse>
{
	handle(value: ChakavakGetEChequeFieldsCommand): Promise<ChakavakGetEChequeFieldsResponse> {
		const apiClient = new APIClient<ChakavakGetEChequeFieldsRequest, ChakavakGetEChequeFieldsResponse>(
			ChakavakGetEChequeFields
		);
		return apiClient.post(<ChakavakGetEChequeFieldsRequest>{
			CustomerNo: value.CustomerNo,
			Id: value.Id
		});
	}
}
