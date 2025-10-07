import { CheckSheet } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse';
import { RecieverRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { IssueChequeOverView } from 'common/entities/cheque/Digital Cheque/Verify Otp/VerifyOtpResponse';
import { create } from 'zustand';

interface Functions {
	setNewDataToWizard: <T extends keyof IssuCheckWizardData>(data: Record<T, IssuCheckWizardData[T]>) => void;
	reset: () => void;
}

interface IssuCheckWizardData {
	accountType?: string;
	CorporateChequeCompany?: {};
	selectCheckPage?: {
		selectedAccount: string;
		selectedCheckbook: string;
		selectedSheet: string;
		checkData: CheckSheet;
		selectedAccountName: string;
	};
	checkInfoPage?: {
		checkAmount: string;
		date: Date;
		reason: { value: string; name: string };
		description: string;
		recieverIban: string;
		paymentId: string;
	};
	addReceiverPage?: {
		receivers?: RecieverRequest[];
		signitureRequirementData?: {
			issueChequeKey?: string;
			isSingleSignatureLegal?: boolean;
		};
	};
	otpPage?: {
		needInquiryWithDrawalGroup?: boolean;
		issueChequeOverView?: IssueChequeOverView;
		message?: string
	};
}

export const useIssueCheckWizardData = create<IssuCheckWizardData & Functions>((set) => ({
	setNewDataToWizard: (data) => {
		set((state) => ({
			...state,
			...data
		}))
	},

	reset: () => {
		return set(() => ({
			selectCheckPage: undefined,
			checkInfoPage: undefined,
			addReceiverPage: undefined,
			otpPage: undefined
		}));
	}
}));
