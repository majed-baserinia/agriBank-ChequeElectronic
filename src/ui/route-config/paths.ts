export const paths = {
	Home: '/cheque',
	Activation: {
		firstStepPath: '/cheque/activation/firstStep',
		secondStepPath: '/cheque/activation/secondStep'
	},

	Deactivation: '/cheque/Deactivation',
	IssueCheck: {
		SelectAccountPath: '/cheque/Issue/SelectAccount',
		CheckInfoPath: '/cheque/Issue/CheckInfo',
		addReceiversPath: '/cheque/Issue/addReceivers',
		SignatureRegistrationPath: '/cheque/Issue/SignatureRegistration',
		SignatureGroupPath: '/cheque/Issue/SignatureGroup',
		OverViewPath: '/cheque/Issue/OverView',
		OtpCheckPath: '/cheque/Issue/OtpCheck'
	},
	cartable: {
		SelectList: '/cheque/cartable/SelectList',
		CartableList: '/cheque/cartable/CartableList',
		Details: '/cheque/cartable/detail',
		Transfer: '/cheque/cartable/transferCheck',
		AddNewReceivers: '/cheque/cartable/transferCheck/AddNewReceivers',
		OtpTransferConfirmation: '/cheque/cartable/transferCheck/OtpTransferConfirmation',
		TransferSignatureGroup: '/cheque/cartable/transferCheck/TransferSignatureGroup',
		TransferOverView: '/cheque/cartable/transferCheck/TransferOverView',
		Cashing: '/cheque/cartable/CashingCheck',
		GiveBackCheckInitiate: '/cheque/cartable/GiveBackCheckInitiate',
		GiveBackCheckOTP: '/cheque/cartable/GiveBackCheckOTP',
		GiveBackCheckSignature: '/cheque/cartable/GiveBackCheckSignature',
		RejectGiveBackCheckInitiate: '/cheque/cartable/RejectGiveBackCheckInitiate',
		RejectGiveBackCheckOTP: '/cheque/cartable/RejectGiveBackCheckOTP',
		RejectGiveBackCheckSignature: '/cheque/cartable/RejectGiveBackCheckSignature'
	},
	HandedOvers: {
		SelectHandedOverList: '/cheque/HandedOvers/SelectHandedOverList',
		HandedOverList: '/cheque/HandedOvers/HandedOverList',
		HandedOverDetails: '/cheque/HandedOvers/HandedOverDetails'
	},
	guide: '/cheque/guide'
};
