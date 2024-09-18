import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import ReceiverInquiryChequeCommand from 'business/application/cheque/cashCheck/ReceiverInquiryCheque/ReceiverInquiryChequeCommand';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ErrorType } from 'common/entities/ErrorType';
import { ReceiverInquiryChequeRequest } from 'common/entities/cheque/cashCheck/ReceiverInquiryCheque/ReceiverInquiryChequeRequest';
import { ReceiverInquiryChequeResponse } from 'common/entities/cheque/cashCheck/ReceiverInquiryCheque/ReceiverInquiryChequeResponse';
import { useNavigate } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';

const mediator = new Mediator();

export default function useReceiverInquiryCheque() {
	const navigate = useNavigate()
	return useMutation<
		ReceiverInquiryChequeResponse,
		ErrorType<ReceiverInquiryChequeRequest>,
		ReceiverInquiryChequeCommand
	>({
		mutationFn: (data: ReceiverInquiryChequeCommand) =>
			mediator.send<ReceiverInquiryChequeResponse>(new ReceiverInquiryChequeCommand(data)),
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
					actions: {
						onConfirm: () => {
							navigate(paths.Home);
						},
						onCloseModal: () => {
							navigate(paths.Home);
						}
					}
				});
		
		}
	});
}
