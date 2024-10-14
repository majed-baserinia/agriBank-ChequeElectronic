import { Mediator } from '@Mediatr/index';
import { QueryKey, useQuery } from '@tanstack/react-query';
import CurrentAccountsQuery from 'business/application/cheque/Digital Cheque/Accounts/CurrentAccountsQuery';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ErrorType } from 'common/entities/ErrorType';
import CurrentAccountResponse from 'common/entities/cheque/Digital Cheque/AccountResponse';
import { useNavigate } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';

const mediator = new Mediator();

const useAccounts = () => {
	const navigate = useNavigate();
	return useQuery<CurrentAccountResponse[], ErrorType<object>, CurrentAccountResponse[], QueryKey>({
		queryKey: ['currentAccouns'],
		queryFn: () => mediator.send<CurrentAccountResponse[]>(new CurrentAccountsQuery()),
		staleTime: 0, //ms('30m')
		retry: false,
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
};

export default useAccounts;
