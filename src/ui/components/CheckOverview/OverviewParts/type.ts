export type SignerData = {
	customerNumber: number;
	name: string;
};

export type ReceiverData = {
	name: string;
	shahabNo: string;
	nationalNo: string;
	//customerType: 1 | 2 | 3 | 4;
};

export interface HolderData  {
	name: string;
	nationalNo: string;
	customerType: 1 | 2 | 3 | 4;
	customerTypeDescription: string;
	lastActionDate: string;
	acceptTransfer: 0 | 1 | 2;
	acceptTransferDescription: string;
};

export type Props =
	| {
			type: 'receiver';
			receiverData: ReceiverData;
	  }
	| {
			type: 'signer';
			signerData: SignerData;
	  }
	| {
			type: 'holder';
			holderData: HolderData;
	  };
