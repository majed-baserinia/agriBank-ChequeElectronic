import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';

import useTransferChequeFinalize from './useTransferChequeFinalize';
import useRejectTransferChequeFinalize from './useRejectTransferChequeFinalize';

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
