import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import InquiryTransferStatusCommand from 'business/application/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { InquiryTransferStatusRequest } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusRequest';
import { InquiryTransferStatusRespone } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusResponse';

const mediator = new Mediator();

export default function useInquiryTransferStatus() {
	return useMutation<
		InquiryTransferStatusRespone,
		ErrorType<InquiryTransferStatusRequest>,
		InquiryTransferStatusCommand
	>({
		mutationFn: (data: InquiryTransferStatusCommand) =>
			mediator.send<InquiryTransferStatusRespone>(new InquiryTransferStatusCommand(data)),
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
