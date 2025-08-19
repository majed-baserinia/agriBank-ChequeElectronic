import useInitPostMessage from 'business/hooks/postMessage/useInitPostMessage';
import { changeLanguage } from 'i18next';
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import MaterialThemeProvider from 'ui/components/MaterialThemeProvider';
import AppAlerts from 'ui/htsc-components/alerts/AppAlerts';
// import Loader from 'ui/htsc-components/loader/Loader';
import themeInitializer from 'ui/theme-config/baseTheme';

import ApiConfigSingleton from '../../business/stores/api-config-singleton';
import useInitialSettingStore from '../../business/stores/initial-setting-store';
import { Loader, useLoadingHandler } from "@agribank/ui/components/Loader";


import { useLocation, Outlet } from 'react-router-dom';
import { useIssueCheckWizardData } from 'business/stores/issueCheck/useIssueCheckWizardData';
import { usePostMessageRaw } from '@agribank/post-message';

const Layout = () => {
	const { readyToLoad } = useInitPostMessage();
	// console.log("readyToLoad", readyToLoad)
	const { settings, setSettings } = useInitialSettingStore((s) => s);
	const [configReady, seConfigReady] = useState(false);

	const location = useLocation();
	console.log('Current route:', location.pathname);
	// console.log('store:', useIssueCheckWizardData((store) => store));

	const GlobalStyle = createGlobalStyle`
      html, body {
        direction: ${settings.language === 'fa-IR' ? 'rtl' : 'ltr'};
        font-family: ${settings.language === 'fa-IR' ? 'IRANSans' : 'Roboto , sans-serif'};
      }
    `;

	const getConfig = async () => {
		try {
			const res = await fetch('/api-config.json');
			const apiConf = (await res.json()) as Record<string, string>;
			ApiConfigSingleton.initiateApiConfig(apiConf?.apiBaseUrl);

			//read lang and theme from query string
			const urlParams = new URLSearchParams(window.location.search);
			const language = urlParams.get('Lang');
			const themeName = urlParams.get('Theme');

			//get the theme and set the language
			const theme = await themeInitializer(themeName, apiConf?.ThemeRoute);

			void changeLanguage(language ?? 'fa-IR');

			//set the settings {theme, language, idToken, refreshToken} to store

			setSettings({
				...settings,
				theme: theme,
				language: language ? language : 'fa-IR'
			});

			seConfigReady(true);
		} catch (err) {
			//TODO: add a convinent alert for this
			//probaly send a postmessage to parent
			alert("can't initiate");
		}
	};
	useEffect(() => {
		void getConfig();
	}, [readyToLoad]);

	// usePostMessageRaw({
	// 	// message: ()=>{return }$
	// 	callback: (e: any) => {
	// 		alert(JSON.stringify(e.data))
	// 	}
	// });

	if (!readyToLoad) {
		return settings?.theme?.palette ? < MaterialThemeProvider >
			<Loader.Controlled showLoader />
		</MaterialThemeProvider >
			: <></>
	}
	return (
		settings?.theme?.palette ? <div className='w-full h-full'>
			<MaterialThemeProvider>
				<GlobalStyle />
				<Loader.UnControlled />
				<AppAlerts />
				<Outlet />
			</MaterialThemeProvider >
		</div>
			: <></>
	);
};

export default Layout;
