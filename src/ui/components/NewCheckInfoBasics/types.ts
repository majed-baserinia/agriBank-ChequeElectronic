import { AllowedNumbers } from "../CheckListComps/types";

export type Props = {
	checkData: {
		sayad: string;
		serie: string;
		serial: string;
		amount: string;
		reason: string;
		description: string;
		sheba?: string;
		date: string;
        checkStatus?: AllowedNumbers
	};
};