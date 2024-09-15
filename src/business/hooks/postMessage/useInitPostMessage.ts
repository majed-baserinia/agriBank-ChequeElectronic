import { pushAlert } from 'business/stores/AppAlertsStore';
import useInitialSettingStore, { InitialSetting } from 'business/stores/initial-setting-store';
import { useEffect, useRef, useState } from 'react';
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

	const [receivedInitPostmessage, setReceivedInitPostmessage] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		window.addEventListener('message', onReceivePostMessage);

		// Clean up the event listener and interval on unmount
		return () => {
			window.removeEventListener('message', onReceivePostMessage);
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	useEffect(() => {
		const startSendingPostMessages = () => {
			if (receivedInitPostmessage) return; // Prevent sending if response is already received

			const id = setInterval(() => {
				sendPostmessage('iFrameReady', 'Hi Parent');
			}, 500);

			intervalRef.current = id;

			// Schedule clearing of interval after 5 seconds
			timeoutRef.current = setTimeout(() => {
				if (intervalRef.current) {
					clearInterval(intervalRef.current);
				}

				if (!receivedInitPostmessage) {
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

		if (needsInitData) {
			startSendingPostMessages();
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			setReceivedInitPostmessage(true);
		}
	}, [receivedInitPostmessage]);

	const onReceivePostMessage = (event: MessageEvent) => {
		const type = event.data.type;

		if (type === 'initiateIFrame') {
			initiateIFrameHandler(event.data.data);
		}
		if (type === 'goback') {
			goBackHandler();
		}
	};

	const initiateIFrameHandler = (data: InitialSetting) => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		//receivedInitPostmessage.current = true;
		setReceivedInitPostmessage(true);
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

	return { readyToLoad: receivedInitPostmessage, checkIsInIframe };
};

export default useInitPostMessage;
