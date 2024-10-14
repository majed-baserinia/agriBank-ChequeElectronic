import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import CartableInquiryCommand from 'business/application/cheque/checkList/CartableInquiry/CartableInquiryCommand';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ErrorType } from 'common/entities/ErrorType';
import { CartableInquiryRequest } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryRequest';
import { CartableInquiryResponse } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { useNavigate } from 'react-router-dom';

const mediator = new Mediator();

export default function useCartableInquiryCommand() {
	const navigate = useNavigate();

	return useMutation<CartableInquiryResponse, ErrorType<CartableInquiryRequest>, CartableInquiryCommand>({
		mutationFn: (data: CartableInquiryCommand) =>
			mediator.send<CartableInquiryResponse>(new CartableInquiryCommand(data)),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (data) => {
			return () => data;
		},
		onError: (err) =>
			pushAlert({
				type: 'error',
				messageText: err.detail,
				hasConfirmAction: true,
				actions: { onConfirm: () => navigate(-1) }
			})
	});
}
