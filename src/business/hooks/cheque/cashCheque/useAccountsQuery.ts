import { Mediator } from '@Mediatr/index';
import { useQuery } from '@tanstack/react-query';
import AccountsQuery from 'business/application/cheque/cashCheck/Accounts/AccountsQuery';
import {AccountsQueryResponse} from 'common/entities/cheque/cashCheck/AccountsQuery/AccountsQueryResponse';

const mediator = new Mediator();

const useAccountsQuery = () =>
	useQuery({
		queryKey: ['accounts'],
		queryFn: () => mediator.send<AccountsQueryResponse>(new AccountsQuery()),
		staleTime: 0, //ms('30m')
		retry: false
	});

export default useAccountsQuery;
