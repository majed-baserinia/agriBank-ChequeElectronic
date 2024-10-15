import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { getChecksheets } from 'business/infrastructure/end-points';
import { GetCheckSheetsRequest } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsRequest';
import { GetCheckSheetsResponse } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse';
import GetChecksheetsCommand from './GetCheckSheetsCommand';

@requestHandler(GetChecksheetsCommand)
export class GetChecksheetsCommandHandler implements IRequestHandler<GetChecksheetsCommand, GetCheckSheetsResponse> {
	handle(value: GetChecksheetsCommand): Promise<GetCheckSheetsResponse> {
		const apiClient = new APIClient<GetCheckSheetsRequest, GetCheckSheetsResponse>(getChecksheets);
		return apiClient.post(<GetCheckSheetsRequest>{
			accountNumber: value.accountNumber,
			startChequeNo: value.startChequeNo,
			endChequeNo: value.endChequeNo,
			pageNo: value.pageNo
		});
	}
}
