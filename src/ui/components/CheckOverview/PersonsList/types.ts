import { Signer } from 'common/entities/cheque/Digital Cheque/Issue Groups/IssueWithGroupResponse';
import { Holder } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusResponse';

export type Props = {
	recievers?: {
		name: string;
		shahabNo: string;
		nationalNo: string;
		customerTypeDescription: string;
	}[];
	signers?: Signer[];
	holders?: Holder[];
};
