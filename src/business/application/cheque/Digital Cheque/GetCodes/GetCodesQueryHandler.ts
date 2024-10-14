import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { getCodes } from 'business/infrastructure/end-points';
import { GetCodeResponse } from 'common/entities/cheque/Digital Cheque/GetCodesResponse';
import GetCodesQuery from './GetCodesQuery';

@requestHandler(GetCodesQuery)
export class GetCodesQueryHandler implements IRequestHandler<GetCodesQuery, GetCodeResponse> {
	handle(): Promise<GetCodeResponse> {
		const apiClient = new APIClient<null, GetCodeResponse>(getCodes);
		return apiClient.getAll({});
	}
}
