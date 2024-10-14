import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import InquiryWithDrawalGroupsCommand from 'business/application/cheque/Digital Cheque/Inquiry With drawal groups/InquiryWithDrawalGroupsCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { InquiryWithGroupRequest } from 'common/entities/cheque/Digital Cheque/Inquiry Groups/InquiryWithGroupRequest';
import { InquiryWithGroupResponse } from 'common/entities/cheque/Digital Cheque/Inquiry Groups/InquiryWithGroupResponse';

const mediator = new Mediator();

export default function useInquiryWithDrawalGroup() {
	return useMutation<InquiryWithGroupResponse, ErrorType<InquiryWithGroupRequest>, InquiryWithDrawalGroupsCommand>({
		mutationFn: (data: InquiryWithDrawalGroupsCommand) =>
			mediator.send<InquiryWithGroupResponse>(new InquiryWithDrawalGroupsCommand(data)),
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
