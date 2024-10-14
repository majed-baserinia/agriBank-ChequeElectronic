import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import GetChecksheetsCommand from 'business/application/cheque/Digital Cheque/GetCheckSheets/GetCheckSheetsCommand';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ErrorType } from 'common/entities/ErrorType';
import { GetCheckSheetsRequest } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsRequest';
import { GetCheckSheetsResponse } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse';
import { useNavigate } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';

const mediator = new Mediator();

export default function useGetChecksheets() {
	const navigate = useNavigate();
	return useMutation<GetCheckSheetsResponse, ErrorType<GetCheckSheetsRequest>, GetChecksheetsCommand>({
		mutationFn: (data: GetChecksheetsCommand) =>
			mediator.send<GetCheckSheetsResponse>(new GetChecksheetsCommand(data)),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (data) => {
			return () => data;
		},
		onError: (err) => {
			pushAlert({
				type: 'error',
				messageText: err.detail,
				hasConfirmAction: true,
				actions: {
					onCloseModal: () => navigate(paths.Home),
					onConfirm: () => navigate(paths.Home)
				}
			});
		}
	});
}
