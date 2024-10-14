import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import RecieverNameInquiryCommand from 'business/application/cheque/Digital Cheque/RecieverNameInquiry/RecieverNameInquiryCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { RecieverNameInquiryRequest } from 'common/entities/cheque/Digital Cheque/RecieverNameInquiry/RecieverNameInquiryRequest';
import { RecieverNameInquiryResponse } from 'common/entities/cheque/Digital Cheque/RecieverNameInquiry/RecieverNameInquiryResponse';

const mediator = new Mediator();

export default function useRecieverNameInquiry() {
	return useMutation<RecieverNameInquiryResponse, ErrorType<RecieverNameInquiryRequest>, RecieverNameInquiryCommand>({
		mutationFn: (data: RecieverNameInquiryCommand) =>
			mediator.send<RecieverNameInquiryResponse>(new RecieverNameInquiryCommand(data)),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (data) => {
			return () => data;
		},
		onError: (_, variables) => {
			return () => variables;
		}
	});
}
