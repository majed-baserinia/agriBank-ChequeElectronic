import { GetAllRelatedCustomersResponse } from 'common/entities/cheque/chekList/GetAllRelatedCustomers/GetAllRelatedCustomersResponse';
import { create } from 'zustand';

interface Functions {
	addNewDataToStore: <T extends keyof TransferedChecksStore>(data: Record<T, TransferedChecksStore[T]>) => void;
	reset: () => void;
}

interface TransferedChecksStore {
	relatedCustomers?: GetAllRelatedCustomersResponse;
}

export const useTransferedChecksStore = create<Functions & TransferedChecksStore>((set) => ({
	addNewDataToStore: (data) => {
		set((store) => ({
			...store,
			...data
		}));
	},
	reset: () => {
		set(() => ({
			relatedCustomers: undefined
		}));
	}
}));
