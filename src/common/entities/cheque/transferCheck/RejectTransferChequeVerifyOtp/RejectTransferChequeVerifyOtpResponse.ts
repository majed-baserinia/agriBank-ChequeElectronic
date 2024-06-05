import { Reciever, Signer } from '../../Digital Cheque/Issue Groups/IssueWithGroupResponse';

export interface RejectTransferChequeVerifyOtpResponse {
	transferChequeKey: string;
	needInquiryWithDrawalGroup: boolean;
	transferChequeOverView: {
		sayadNo: number;
		reason: string;
		description: string;
		toIban: string;
		signers: Signer[];
		recievers: Reciever[];
	};
}
