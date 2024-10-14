import { AuthTokens, saveAuthTokens } from 'business/infrastructure/auth-service';
import { create } from 'zustand';

export interface InitialAuthorizeProfiles {
	idToken: string | undefined;
	refreshToken: string | undefined;
}

interface InitialAuthorizeProfilesStore {
	authorize: InitialAuthorizeProfiles;
	setToken: (authorize: InitialAuthorizeProfiles) => void;
	//clearToken: () => void;
}

const useTokenAutorisationStore = create<InitialAuthorizeProfilesStore>((set) => ({
	authorize: <InitialAuthorizeProfiles>{},
	setToken: (authorize) => {
		if (authorize) {
			saveAuthTokens(<AuthTokens>{
				idToken: authorize.idToken,
				refreshToken: authorize.refreshToken
			});
		}

		set((store) => ({
			authorize: {
				...store.setToken,
				accounts: undefined,
				idToken: undefined,
				idTokenLogin: undefined,
				refreshToken: undefined,
				refreshTokenLogin: undefined
			}
		}));
	}
}));

export default useTokenAutorisationStore;
