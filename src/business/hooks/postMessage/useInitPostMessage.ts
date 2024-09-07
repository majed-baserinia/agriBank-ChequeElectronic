import { pushAlert } from 'business/stores/AppAlertsStore';
import useInitialSettingStore, { InitialSetting } from 'business/stores/initial-setting-store';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { postMessageTypes } from './types';

const checkIsInIframe = () => {
	return !(window.self === window.top);
};

export const sendPostmessage = (type: postMessageTypes, data: string) => {
	const parentWindow = window.parent;
	parentWindow.postMessage({ type: type, data: data }, '*');
};

const useInitPostMessage = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const needsInitData = import.meta.env.VITE_APP_NEEDS_INIT_POSTMESSAGE === 'true';
	const { settings, setSettings } = useInitialSettingStore((s) => s);

	const receivedInitPostmessage = useRef(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const onReceivePostMessage = (event: MessageEvent) => {
			const type = event.data.type;
			if (type === 'initiateIFrame') {
				initiateIFrameHandler(event.data.data);
			}
			if (type === 'goback') {
				goBackHandler();
			}
		};

		const startSendingPostMessages = () => {
			if (receivedInitPostmessage.current) return; // Prevent sending if response is already received

			const id = setInterval(() => {
				if (receivedInitPostmessage.current) {
					clearInterval(id);
				} else {
					sendPostmessage('iFrameReady', 'Hi Parent');
				}
			}, 500);

			intervalRef.current = id;

			// Schedule clearing of interval after 5 seconds
			setTimeout(() => {
				if (intervalRef.current) {
					clearInterval(intervalRef.current);
				}

				if (!receivedInitPostmessage.current) {
					pushAlert({
						type: 'error',
						messageText: t('initErrorText'),
						hasConfirmAction: true,
						actions: {
							onConfirm() {
								sendPostmessage('isFinishedBack', 'true');
							},
							onCloseModal() {
								sendPostmessage('isFinishedBack', 'true');
							}
						}
					});
				}
			}, 5000);
		};

		window.addEventListener('message', onReceivePostMessage);

		if (needsInitData) {
			startSendingPostMessages();
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			receivedInitPostmessage.current = true;
		}

		// Clean up the event listener and interval on unmount
		return () => {
			window.removeEventListener('message', onReceivePostMessage);
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [receivedInitPostmessage.current, needsInitData]);

	const initiateIFrameHandler = (data: InitialSetting) => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		receivedInitPostmessage.current = true;
		setSettings({
			...settings,
			...data
		});
	};

	const goBackHandler = () => {
		//set the "base" proberty in the viteconfig file to the base url of the project to access import.meta.env.BASE_URL
		const basePath = import.meta.env.BASE_URL;

		if (window.location.pathname == basePath || `${window.location.pathname}/` == basePath) {
			sendPostmessage('isFinishedBack', 'true');
		}
		navigate(-1);
	};

	return { readyToLoad: receivedInitPostmessage.current, checkIsInIframe };
};

export default useInitPostMessage;
