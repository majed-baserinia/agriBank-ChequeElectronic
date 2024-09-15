import { Mediator } from '@Mediatr/index';
import { useQuery } from '@tanstack/react-query';
import GetCodesQuery from 'business/application/cheque/Digital Cheque/GetCodes/GetCodesQuery';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ErrorType } from 'common/entities/ErrorType';
import { GetCodeResponse } from 'common/entities/cheque/Digital Cheque/GetCodesResponse';
import { useNavigate } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';

const mediator = new Mediator();

export default function useGetReasonCodes() {
	const navigate = useNavigate();
	return useQuery<GetCodeResponse, ErrorType<{}>, GetCodeResponse>({
		queryKey: ['reasonsCode'],
		queryFn: () => mediator.send<GetCodeResponse>(new GetCodesQuery()),
		staleTime: 0, //ms('30m')
		retry: false,
		onError: (error) => {
			pushAlert({
				type: 'error',
				messageText: error.detail,
				hasConfirmAction: true,
				actions: {
					onCloseModal: () => navigate(paths.Home),
					onConfirm: () => navigate(paths.Home)
				}
			});
		}
	});
}
