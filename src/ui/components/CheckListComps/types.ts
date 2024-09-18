
export type rowType =
	| {
			sayadNumber: string;
			status: JSX.Element;
			serieAndSerial: string;
			amount: string;
			reason: string;
			date: string;
			action: JSX.Element;
	  }[]
	| undefined;

export type CheckData = {
	sayad: string;
	amount: string;
	dueDate: string;
	serie: string;
	serial: string;
	reason: string;
	description: string;
	checkStatus: string;
	sheba?: string;
	sharedStatus?: string;
	lockedStatus?: string;
	blockedStatus?: string;
	settlementDate?: string;
	issueDate?: string;
	branchCode?: string;
	bankCode?: string;
	checkType?: string;
};
