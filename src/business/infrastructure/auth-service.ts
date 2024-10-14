export interface AuthTokens {
	idToken: string | undefined;
	refreshToken: string | undefined;
}

export interface AuthTokensProfiles {
	idTokenProfiles: string | undefined;
	refreshTokenProfiles: string | undefined;
}

export const saveAuthTokens = (tokens: AuthTokens): void => {
	sessionStorage.setItem('id_token', tokens.idToken || '');
	sessionStorage.setItem('refresh_token', tokens.refreshToken || '');
};

export const getAuthTokens = (): AuthTokens | null => {
	const idToken = sessionStorage.getItem('id_token');
	const refreshToken = sessionStorage.getItem('refresh_token');
	if (idToken && refreshToken) {
		return { idToken, refreshToken };
	}
	return null;
};

export const saveAuthTokensProFiles = (tokens: AuthTokensProfiles): void => {
	sessionStorage.setItem('id_tokenProFiles', tokens.idTokenProfiles || '');
	sessionStorage.setItem('refresh_tokenProFiles', tokens.refreshTokenProfiles || '');
};

export const getAuthTokensProFiles = (): AuthTokens | null => {
	const idToken = sessionStorage.getItem('id_tokenProFiles');
	const refreshToken = sessionStorage.getItem('refresh_tokenProFiles');
	if (idToken && refreshToken) {
		return { idToken, refreshToken };
	}
	return null;
};

export const clearAuth = (): void => {
	sessionStorage.removeItem('id_token');
	sessionStorage.removeItem('refresh_token');
};

export const getAllDataAccountOperation = (): string | null => {
	const AllDataAccountOperation = sessionStorage.getItem('AllDataAccountOperation');
	if (AllDataAccountOperation) {
		return AllDataAccountOperation;
	}
	return null;
};
export const setRefreshFailFlag = () => {
	sessionStorage.setItem('refresh_token_failed', 'true');
};

export const getRefreshFailFlag = (): string | null => {
	return sessionStorage.getItem('refresh_token_failed');
};

export const clearRefreshFailFlag = () => {
	sessionStorage.removeItem('refresh_token_failed');
};
