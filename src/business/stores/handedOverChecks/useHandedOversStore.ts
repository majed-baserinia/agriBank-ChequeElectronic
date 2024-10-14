import {
	ChakavakGetEChequeListResponse,
	chakavakCheck
} from 'common/entities/cheque/chekList/ChakavakGetEChequeList/ChakavakGetEChequeListResponse';
import { GetAllRelatedCustomersResponse } from 'common/entities/cheque/chekList/GetAllRelatedCustomers/GetAllRelatedCustomersResponse';
import { create } from 'zustand';

interface Actions {
	addNewStoreData: <T extends keyof HandedOversData>(data: Record<T, HandedOversData[T]>) => void;
	resetStore: () => void;
}

interface HandedOversData {
	selectListPage?: { relatedCustomers: GetAllRelatedCustomersResponse };
	detailsPage?: { check: chakavakCheck };
	listPage?: { allCheckList: ChakavakGetEChequeListResponse };
}

export const useHandedOversData = create<Actions & HandedOversData>((set) => ({
	addNewStoreData: (data) => {
		set((store) => ({
			...store,
			...data
		}));
	},
	resetStore: () => {
		set(() => ({
			detailsPage: undefined,
			listPage: undefined,
			selectListPage: undefined
		}));
	}
}));
