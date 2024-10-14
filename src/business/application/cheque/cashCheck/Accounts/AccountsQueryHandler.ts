import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { Accounts } from 'business/infrastructure/end-points';
import { AccountsQueryResponse } from 'common/entities/cheque/cashCheck/AccountsQuery/AccountsQueryResponse';
import AccountsQuery from './AccountsQuery';

@requestHandler(AccountsQuery)
export class AccountsQueryHandler implements IRequestHandler<AccountsQuery, AccountsQueryResponse> {
	handle(): Promise<AccountsQueryResponse> {
		const apiClient = new APIClient<null, AccountsQueryResponse>(Accounts);
		return apiClient.getAll({});
	}
}
