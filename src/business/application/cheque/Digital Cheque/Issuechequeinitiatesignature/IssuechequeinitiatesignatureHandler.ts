import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { IssueChequeInitiateSignature } from 'business/infrastructure/end-points';
import { IssueChequeInitiateSignatureRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiateSignature/IssueChequeInitiateSignatureRequest';
import { IssueChequeInitiateSignatureResponse } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiateSignature/IssueChequeInitiateSignatureResponse';
import IssueChequeInitiateSignatureCommand from './IssuechequeinitiatesignatureCommand';

@requestHandler(IssueChequeInitiateSignatureCommand)
export class IssueChequeInitiateSignatureCommandHandler
	implements IRequestHandler<IssueChequeInitiateSignatureCommand, IssueChequeInitiateSignatureResponse> {
	handle(value: IssueChequeInitiateSignatureCommand): Promise<IssueChequeInitiateSignatureResponse> {
		const apiClient = new APIClient<IssueChequeInitiateSignatureRequest, IssueChequeInitiateSignatureResponse>(
			IssueChequeInitiateSignature
		);
		return apiClient.post(<IssueChequeInitiateSignatureRequest>{
			issueChequeKey: value.issueChequeKey
		});
	}
}
