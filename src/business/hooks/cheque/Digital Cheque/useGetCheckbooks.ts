import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import GetCheckbooksQuery from 'business/application/cheque/Digital Cheque/GetCheckbooks/GetCheckbooksQuery';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ErrorType } from 'common/entities/ErrorType';
import { GetCheckbooksRequest } from 'common/entities/cheque/Digital Cheque/GetCheckbooks/GetCheckbooksRequest';
import { GetCheckbooksResponse } from 'common/entities/cheque/Digital Cheque/GetCheckbooks/GetCheckbooksResponse';
import { useNavigate } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';

const mediator = new Mediator();

export default function useGetCheckbooks() {
	const navigate = useNavigate();
	return useMutation<GetCheckbooksResponse, ErrorType<GetCheckbooksRequest>, GetCheckbooksQuery>({
		mutationFn: (data: GetCheckbooksQuery) =>
			mediator.send<GetCheckbooksResponse>(new GetCheckbooksQuery(data.accountNumber)),
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
