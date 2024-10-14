/* eslint-disable @typescript-eslint/ban-types */
import { mediatorSettings } from '@Mediatr/index.js';
import type { INotificationHandlerClass } from '@Mediatr/interfaces/inotification.handler.js';
import type { INotificationClass } from '@Mediatr/interfaces/inotification.js';

/**
 * Decorate the notificationHandler with this attribute
 *
 * @param value The request type
 * @param order The order of event
 */
const notificationHandler = (value: INotificationClass) => {
	return (target: Function): void => {
		mediatorSettings.dispatcher.notifications.add({
			notification: value,
			handler: target as INotificationHandlerClass<unknown>
		});
	};
};

export default notificationHandler;
