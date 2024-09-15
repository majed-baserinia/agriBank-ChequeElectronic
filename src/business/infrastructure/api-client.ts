import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { sendPostmessage } from 'business/hooks/postMessage/useInitPostMessage';
import { pushAlert } from 'business/stores/AppAlertsStore';
import ApiConfigSingleton from 'business/stores/api-config-singleton';
import useInitialSettingStore from 'business/stores/initial-setting-store';
import { ErrorType } from 'common/entities/ErrorType';
import i18n from 'i18n';
import { t } from 'i18next';
import { clearAuth, getAuthTokens, saveAuthTokens } from './auth-service';

const axiosInstance = axios.create({
	headers: {
		'Content-Type': 'application/json'
	}
});

const axiosForLogin = axios.create({
	headers: {
		'Content-Type': 'application/json'
	}
});

axiosRetry(axiosInstance, {
	retries: 1,
	retryCondition: (error) => {
		return error.response?.status === 401;
	}
});

const refreshToken = async (refreshToken: string): Promise<string | undefined> => {
	const authTokens = getAuthTokens();
	const baseUrl = ApiConfigSingleton.getApiConfig().baseUrl;
	axiosForLogin.defaults.headers.common['Authorization'] = `Bearer ${authTokens?.idToken}`;
	const response = await axiosForLogin.post(baseUrl + '/refreshtoken', {
		refreshToken: refreshToken
	});
	const newIdToken = response.data.idToken;
	const newRefreshToken = response.data.refreshToken;
	saveAuthTokens({ idToken: newIdToken, refreshToken: newRefreshToken });
	return newIdToken;
};

axiosForLogin.interceptors.request.use((config) => {
	config.headers['accept-language'] = i18n.language;
	config.headers['os-type'] = useInitialSettingStore.getState().settings.osType;

	return config;
});

axiosInstance.interceptors.request.use((config) => {
	const authTokens = getAuthTokens();
	if (authTokens) {
		const { idToken } = authTokens;
		config.headers.Authorization = `Bearer ${idToken}`;
	}
	config.headers['accept-language'] = i18n.language;
	config.headers['os-type'] = useInitialSettingStore.getState().settings.osType;
	return config;
});

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	async <TResponse>(error: AxiosError) => {
		const originalRequest = error.config;

		const authTokens = getAuthTokens();

		if (authTokens && error.response?.status === 401) {
			const refreshTokenValue = authTokens.refreshToken;
			try {
				const newIdToken = await refreshToken(refreshTokenValue!);
				axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newIdToken}`;
				return axiosInstance.request(originalRequest!);
			} catch (refreshError) {
				clearAuth();
				window.location.href = import.meta.env.BASE_URL;
				sendPostmessage('tokenIsNotValid', 'true');
			}
		} else if (error.response?.status == 400 && error?.response?.data) {
			throw prepareErrorType(<ErrorType<TResponse>>error?.response?.data);
		}

		if (error.message === 'Network Error' && error.response?.status !== 500) {
			pushAlert({
				type: 'error',
				messageText: t('netErr'),
				hasConfirmAction: true
			});
		}
		return Promise.reject(prepareErrorType(<ErrorType<TResponse>>error?.response?.data));
	}
);

class APIClient<TBody, TResponse> {
	endpoint: string;
	constructor(endpoint: string, baseUrl?: string) {
		baseUrl = baseUrl ?? ApiConfigSingleton.getApiConfig().baseUrl;
		this.endpoint = baseUrl + endpoint;
	}

	getAll = (config: AxiosRequestConfig) => {
		return axiosInstance.get<TResponse>(this.endpoint, config).then((res) => res.data);
	};

	get = (id: number | string) => {
		return axiosInstance.get<TResponse>(this.endpoint + '/' + id).then((res) => res.data);
	};

	post = (body: TBody) => {
		return axiosInstance.post<TResponse>(this.endpoint, body).then((res) => res.data);
	};

	login = (body: TBody) => {
		return axiosForLogin
			.post<TResponse>(this.endpoint, body)
			.then((res) => res.data)
			.catch((error: AxiosError) => {
				if (error.response?.status == 400) {
					throw new Error((<any>error?.response?.data).detail || 'Internal Error');
				}
				throw new Error('Internal Error');
			});
	};
}

function prepareErrorType<T>(error: ErrorType<T>) {
	if (!error.detail || error.detail.trim().length === 0) {
		error.detail = i18n.t('Internal Error');
	}
	error.instance = error?.instance || '';
	return error;
}

export default APIClient;
