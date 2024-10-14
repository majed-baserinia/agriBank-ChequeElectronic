import { IRequestHandler, requestHandler } from '@Mediatr/index';
import CurrentAccountsQuery from 'business/application/cheque/Digital Cheque/Accounts/CurrentAccountsQuery';
import APIClient from 'business/infrastructure/api-client';
import { CurrentAccounts } from 'business/infrastructure/end-points';
import CurrentAccountResponse from 'common/entities/cheque/Digital Cheque/AccountResponse';

@requestHandler(CurrentAccountsQuery)
export class CurrentAccountsQueryHandler implements IRequestHandler<CurrentAccountsQuery, CurrentAccountResponse[]> {
	handle(): Promise<CurrentAccountResponse[]> {
		const apiClient = new APIClient<null, CurrentAccountResponse[]>(CurrentAccounts);
		return apiClient.getAll({});
	}
}
