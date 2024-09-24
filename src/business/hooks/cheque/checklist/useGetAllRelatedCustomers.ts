import { Mediator } from '@Mediatr/index';
import { useQuery } from '@tanstack/react-query';
import GetAllRelatedCustomersQuery from 'business/application/cheque/checkList/GetAllRelatedCustomers/GetAllRelatedCustomersQuery';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ErrorType } from 'common/entities/ErrorType';
import { GetAllRelatedCustomersResponse } from 'common/entities/cheque/chekList/GetAllRelatedCustomers/GetAllRelatedCustomersResponse';
import { useNavigate } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';

const mediator = new Mediator();

const useGetAllRelatedCustomers = (serviceName: string) => {
	const navigate = useNavigate()
	return useQuery<GetAllRelatedCustomersResponse, ErrorType<{}>, GetAllRelatedCustomersResponse>({
		queryKey: ['GetAllRelatedCustomers'],
		queryFn: () => mediator.send<GetAllRelatedCustomersResponse>(new GetAllRelatedCustomersQuery(serviceName)),
		staleTime: 0, //ms('30m')
		retry: false,
		onError: (err) => {
			pushAlert({
				type: 'error',
				messageText: err.detail,
				hasConfirmAction: true,
				actions: {
					onCloseModal: () => {
						navigate(paths.Home);
					},
					onConfirm: () => {
						navigate(paths.Home);
					}
				}
			});
		}
	});
};

export default useGetAllRelatedCustomers;
