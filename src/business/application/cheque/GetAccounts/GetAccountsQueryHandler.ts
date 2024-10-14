import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { GetAccounts } from 'business/infrastructure/end-points';
import { GetAccountsQueryResponse } from 'common/entities/cheque/GetAccountsQuery/GetAccountsQueryResponse';
import GetAccountsQuery from './GetAccountsQuery';

@requestHandler(GetAccountsQuery)
export class GetAccountsQueryHandler implements IRequestHandler<GetAccountsQuery, GetAccountsQueryResponse> {
	handle(): Promise<GetAccountsQueryResponse> {
		const apiClient = new APIClient<null, GetAccountsQueryResponse>(GetAccounts);
		return apiClient.getAll({});
	}
}
