import { RecieverRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { GiveBackChequeVerifyOtpResponse } from 'common/entities/cheque/GivebackCheck/GiveBackChequeVerifyOtp/GiveBackChequeVerifyOtpResponse';
import { GivebackChequeInitiateResponse } from 'common/entities/cheque/GivebackCheck/GivebackChequeInitiate/GivebackChequeInitiateResponse';
import { RejectGivebackChequeInitiateResponse } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackCheckInitiate/RejectGiveBackCheckInitiateResponse';
import { ReceiverInquiryChequeResponse } from 'common/entities/cheque/cashCheck/ReceiverInquiryCheque/ReceiverInquiryChequeResponse';
import { CartableInquiryResponse, Check } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { GetAllRelatedCustomersResponse } from 'common/entities/cheque/chekList/GetAllRelatedCustomers/GetAllRelatedCustomersResponse';
import { InquiryTransferStatusRespone } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusResponse';
import { TransferChequeInitiateResponse } from 'common/entities/cheque/transferCheck/TransferChequeInitiate/TransferChequeInitiateResponse';
import { TransferChequeVerifyOtpResponse } from 'common/entities/cheque/transferCheck/TransferChequeVerifyOtp/TransferChequeVerifyOtpResponse';
import { create } from 'zustand';

interface Functions {
	addNewCartableData: <T extends keyof cartableListData>(data: Record<T, cartableListData[T]>) => void;
	reset: () => void;
}

interface cartableListData {
	transferAction?: 'confirm' | 'reject';
	relatedCustomers?: GetAllRelatedCustomersResponse;
	cartableListData?: CartableInquiryResponse;
	selectedCheck?: { 
		iquiriedData?: ReceiverInquiryChequeResponse | InquiryTransferStatusRespone, 
		dataFromList?: Check
	 };
	basicCheckData?: { reason: { value: string; name: string }; description: string; toIban: string };
	otpTransferRequirments?: TransferChequeInitiateResponse;
	transferOverview?: TransferChequeVerifyOtpResponse;
	receivers?: RecieverRequest[];
	giveBackChequeInitiateResponse?: GivebackChequeInitiateResponse;
	GiveBackChequeVerifyOtpResponse?: GiveBackChequeVerifyOtpResponse;
	RejectGiveBackChequeInitiateResponse?: RejectGivebackChequeInitiateResponse;
}

export const useCartableChecklistData = create<Functions & cartableListData>((set) => ({
	addNewCartableData: (data) => {
		set((store) => ({
			...store,
			...data
		}));
	},
	reset: () => {
		set((store) => ({}));
	}
}));
