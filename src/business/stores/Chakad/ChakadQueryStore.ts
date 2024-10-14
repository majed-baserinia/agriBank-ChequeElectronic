import { create } from 'zustand';

interface AccountChargeQueryStore {
	activationKey: string;
	setChakad_FirstStep: (activationKey: string) => void;
}

export const useAccountChargeStore = create<AccountChargeQueryStore>((set) => ({
	activationKey: '',
	setChakad_FirstStep: (activationKey) =>
		set(() => ({
			activationKey: activationKey
		}))
}));
