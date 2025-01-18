import { RecieverRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { SetStateAction } from 'react';

export type CheckReceiversProps = {
	onRceiversChange: (recievers: RecieverRequest[]) => void;
	sayad: string;
	receivers?: RecieverRequest[];
};

export type AddFormProps = {
	sayad: string;
	setReceivers: (value: SetStateAction<RecieverRequest[]>) => void;
	setOpen: (value: SetStateAction<boolean>) => void;
};

export type ListProps = {
	receivers: RecieverRequest[];
	setReceivers: (value: SetStateAction<RecieverRequest[]>) => void;
};
