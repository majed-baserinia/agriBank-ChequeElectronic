import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { IssueChequeConfirm } from 'business/infrastructure/end-points';
import IssueChequeConfirmCommand from './IssueChequeconfirmCommand';

@requestHandler(IssueChequeConfirmCommand)
export class IssueChequeConfirmHandler implements IRequestHandler<any, any> {
	handle(command: IssueChequeConfirmCommand): Promise<any> {
		const apiClient = new APIClient<any, any>(IssueChequeConfirm);
		return apiClient.post(command.payload);
	}
}