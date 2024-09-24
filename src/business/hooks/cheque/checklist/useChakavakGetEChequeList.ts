import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import ChakavakGetEChequeListCommand from 'business/application/cheque/checkList/ChakavakGetEChequeList/ChakavakGetEChequeListCommand';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ErrorType } from 'common/entities/ErrorType';
import { ChakavakGetEChequeListRequest } from 'common/entities/cheque/chekList/ChakavakGetEChequeList/ChakavakGetEChequeListRequest';
import { ChakavakGetEChequeListResponse } from 'common/entities/cheque/chekList/ChakavakGetEChequeList/ChakavakGetEChequeListResponse';
import { useNavigate } from 'react-router-dom';

const mediator = new Mediator();

export default function useChakavakGetEChequeList() {
	const navigate = useNavigate();
	return useMutation<
		ChakavakGetEChequeListResponse,
		ErrorType<ChakavakGetEChequeListRequest>,
		ChakavakGetEChequeListCommand
	>({
		mutationFn: (data: ChakavakGetEChequeListCommand) =>
			mediator.send<ChakavakGetEChequeListResponse>(new ChakavakGetEChequeListCommand(data)),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (data) => {
			return () => data;
		},
		onError: (error, variables) => {
			pushAlert({
				type: 'error',
				messageText: error.detail,
				hasConfirmAction: true,
				actions: { onConfirm: () => navigate(-1) }
			});
		}
	});
}
