class ApiConfigSingleton {
	private static instance: ApiConfigSingleton;

	baseUrl: string;

	private constructor(baseApiUrl: string) {
		this.baseUrl = baseApiUrl;
	}

	public static initiateApiConfig(baseApiUrl: string) {
		if (!ApiConfigSingleton.instance) {
			ApiConfigSingleton.instance = new ApiConfigSingleton(baseApiUrl);
		}
	}

	public static getApiConfig(): ApiConfigSingleton {
		return ApiConfigSingleton.instance;
	}
}

export default ApiConfigSingleton;
