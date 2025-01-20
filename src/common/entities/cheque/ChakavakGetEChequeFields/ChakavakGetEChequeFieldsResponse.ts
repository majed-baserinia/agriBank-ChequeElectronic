export interface ChakavakGetEChequeFieldsResponse {
	generalInfo: EChequeGeneralInfoDto;
	bearerInfo: BearerInfoDto;
	creditorInfo: CreditorInfoDto;
	debtorInfo: DebtorInfoDto;
	idCentral: number; //شناسه ارسالی به بانک مرکزی
	settlementDate: number; //تاریخ واگذاری
	actDate: number; //تاریخ اعمال تغییرات
	sendDate: number; //تاریخ ارسال چک
	getDate: string; //تاریخ دریافت چک
	ackDate: number; //تاریخ تایید چک
	ackBranch: number; //کد شعبه تایید کننده
}

interface EChequeGeneralInfoDto {
	npcstrn: string; //شناسه رهگیری سامانه چکهای برگشتی
	customerReject: boolean; //برگشت به مشتری
	descDeposit: string; //شرح سند
	chqDate: string; //تاریخ روی چک
	nonPaymentCertificate: boolean; //برگشت صادر شود یا خیر؟
	sayad: string; //شماره صیادی
	instrId: string; //شناسه واریز
	depositDate: string; //تاریخ اقدام برای وصول
	amount: number; //مبلغ چک
	seri: string; //سری رشته ای
	serial: string; //سریال رشته ای
}

interface DebtorInfoDto {
	debtorAccount: string;
	debtorBranchCodeStr: string;
	debtorShahabID: string;
	debtorName: string;
	debtorIBAN: string;
	debtorIdentifier: string;
}

interface CreditorInfoDto {
	creditorIBAN: string;
	creditorFeature: boolean;
	creditorOwnerType: string;
	creditorCustomerNumber: string;
	creditorFirstName: string;
	creditorLastName: string;
	creditorAccount: string;
	creditorBirthCertNumOrRegNum: string;
	creditorBirthDateOrRegDate: string;
	creditorIssueLocationOrRegLocation: string;
	creditorOfficeCode: string;
	creditorLocationCode: string;
	creditorFatherName: string;
	creditorPostalCode: string;
	creditorAddress: string;
	creditorTel: string;
	creditorShahabID: string;
	creditorName: string;
	creditorIdentifier: string;
}

interface BearerInfoDto {
	bearerShahabID: string; //کد شهاب آورنده
	bearerName: string; //نام آورنده چک
	bearerMobilePhoneNumber: string; //شماره موبایل آورنده چک
	bearerIdentifier: string; //کد ملی آورنده
}
