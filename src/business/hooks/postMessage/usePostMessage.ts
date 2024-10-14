import { useEffect } from 'react';

type Props<T> = {
	callback: (e: MessageEvent<T>) => void;
	message?: unknown;
};
export default function usePostMessage<T>(props: Props<T>) {
	const { callback, message } = props;

	useEffect(() => {
		window.addEventListener('message', callback, false);

		if (message) {
			window.parent.postMessage(message, '*');
		}

		return () => {
			window.removeEventListener('message', callback);
		};
	});
}
