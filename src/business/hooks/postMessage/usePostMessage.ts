import { useEffect } from 'react';

type Props = {
	callback: (e: MessageEvent<any>) => void;
	message?: any;
};
export default function usePostMessage(props: Props) {
	const { callback, message } = props;

	useEffect(() => {
		window.addEventListener('message', callback, false);
		message ? window.parent.postMessage(message, '*') : null;
		return () => {
			window.removeEventListener('message', callback);
		};
	});
}
