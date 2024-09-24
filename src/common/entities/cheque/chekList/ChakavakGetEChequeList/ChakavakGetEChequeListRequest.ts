export interface ChakavakGetEChequeListRequest {
	PageNo: number;
	PageSize: number;
	CustomerNo: number;
	AccountNo?: number;
	Serial?: number;
	ChqStatus?: number;
};
