export type Checkbook = {
	type: string;
	branch: string;
	chequeFrom: string;
	chequeTo: string;
	issueDate: string;
	noofCheqs: string;
	pckBranch: string;
	reorder: string;
	status: string;
	chequePercentage: string;
	teller: string;
	expiryDate: string;
	sayadChequebookType: string;
};

export type GetCheckbooksResponse = Checkbook[];
