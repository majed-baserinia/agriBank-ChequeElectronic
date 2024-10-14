import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';

import useRejectTransferChequeFinalize from './useRejectTransferChequeFinalize';
import useTransferChequeFinalize from './useTransferChequeFinalize';

export default function useDetectFinalizeTransfer() {
	const { transferAction } = useCartableChecklistData();
	if (transferAction === 'confirm') {
		return useTransferChequeFinalize;
	}
	if (transferAction === 'reject') {
		return useRejectTransferChequeFinalize;
	}
	return useTransferChequeFinalize;
}
