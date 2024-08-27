export interface ChakavakPutEChequeRequest {
	CustomerNo: number;
	Sayad: number;
	SettlementDate: string;
	Creditor_Account: string;
	InstrId: string;
	NonPaymentCertificate: boolean;
	bearerInfo: ChakavakBearerInfo | null;
}

type ChakavakBearerInfo = {
	Bearer_Name: string;
	Bearer_MobilePhoneNumber: string;
	Bearer_Identifier: string;
	Bearer_Identifier_Type: string;
	Bearer_ShahabID: string;
};
