import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { customercurrentaccounts } from 'business/infrastructure/end-points';
import CurrentAccountsCommand from './CurrentAccountsCommand';

@requestHandler(CurrentAccountsCommand)
export class CurrentAccountsHandler
	implements IRequestHandler<CurrentAccountsCommand, any> {
	handle(command: CurrentAccountsCommand): Promise<any> {
		const apiClient = new APIClient<any, any>(customercurrentaccounts);
		return apiClient.post({
			corporationCif: command.corporationCif,
			serviceName: command.serviceName,
		});
	}
}
