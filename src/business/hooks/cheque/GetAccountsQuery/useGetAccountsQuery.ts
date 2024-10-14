import { Mediator } from '@Mediatr/index';
import { useQuery } from '@tanstack/react-query';
import GetAccountsQuery from 'business/application/cheque/GetAccounts/GetAccountsQuery';
import { ErrorType } from 'common/entities/ErrorType';
import { GetAccountsQueryResponse } from 'common/entities/cheque/GetAccountsQuery/GetAccountsQueryResponse';

const mediator = new Mediator();

const useGetAccountsQuery = () =>
	useQuery<GetAccountsQueryResponse, ErrorType<object>, GetAccountsQueryResponse>({
		queryKey: ['getAccounts'],
		queryFn: () => mediator.send<GetAccountsQueryResponse>(new GetAccountsQuery()),
		staleTime: 0, //ms('30m')
		retry: false
	});

export default useGetAccountsQuery;
