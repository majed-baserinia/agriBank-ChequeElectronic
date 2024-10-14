import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import ChakavakPutEChequeCommand from 'business/application/cheque/cashCheck/ChakavakPutECheque/ChakavakPutEChequeCommand';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ErrorType } from 'common/entities/ErrorType';
import { ChakavakPutEChequeRequest } from 'common/entities/cheque/cashCheck/ChakavakPutECheque/ChakavakPutEChequeRequest';
import { ChakavakPutEChequeResponse } from 'common/entities/cheque/cashCheck/ChakavakPutECheque/ChakavakPutEChequeResponse';
import { useNavigate } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';

const mediator = new Mediator();

export default function useChakavakPutECheque() {
	const navigate = useNavigate();

	return useMutation<ChakavakPutEChequeResponse, ErrorType<ChakavakPutEChequeRequest>, ChakavakPutEChequeCommand>({
		mutationFn: (data: ChakavakPutEChequeCommand) =>
			mediator.send<ChakavakPutEChequeResponse>(new ChakavakPutEChequeCommand(data)),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (res) => {
			pushAlert({
				type: 'success',
				messageText: res.message,
				hasConfirmAction: true,
				actions: {
					onCloseModal: () => navigate(paths.Home),
					onConfirm: () => navigate(paths.Home)
				}
			});
		},
		onError: (error) => {
			pushAlert({ type: 'error', messageText: error.detail, hasConfirmAction: true });
		}
	});
}
