export interface CartableInquiryResponse {
	cheques: Check[];
}

export interface Check {
	sayadNo: string;
	serialNo: string;
	seriesNo: string;
	fromIban: string;
	amount: number;
	dueDate: string;
	description: string;
	reason: string;
	reasonDescription: string;
	bankCode: string;
	branchCode: string;
	currency: number;
	currencyDescription: string;
	chequeType: number;
	chequeTypeDescription: string;
	chequeMedia: number;
	chequeMediaDescription: string;
	chequeStatus: number;
	chequeStatusDescription: string;
	guaranteeStatus: number;
	guaranteeStatusDescription: string;
	blockStatus: number;
	blockStatusDescription: string;
	locked: number;
	lockedDescription: string;
	shared: boolean;
	sharedDescription: string;
}
