import mediatorSettings from '@Mediatr/settings.js';

import requestHandler from '@Mediatr/attributes/request.attribute.js';
import type IRequestHandler from '@Mediatr/interfaces/irequest.handler.js';
import type IRequest from '@Mediatr/interfaces/irequest.js';

import notificationHandler from '@Mediatr/attributes/notification.attribute.js';
import type INotificationHandler from '@Mediatr/interfaces/inotification.handler.js';
import type INotification from '@Mediatr/interfaces/inotification.js';

import type IDispatcher from '@Mediatr/interfaces/idispatcher.js';
import type IResolver from '@Mediatr/interfaces/iresolver.js';

import type IMediator from '@Mediatr/interfaces/imediator.js';
import Mediator from '@Mediatr/models/mediator.js';

export {
	IDispatcher,
	IMediator,
	INotification,
	INotificationHandler,
	IRequest,
	IRequestHandler,
	IResolver,
	Mediator,
	mediatorSettings,
	notificationHandler,
	requestHandler
};

/**
 * @deprecated Use requestHandler instead
 */
export const Handler = requestHandler;

/**
 * @deprecated Use requestHandler instead
 */
export const RequestHandler = requestHandler;

/**
 * @deprecated Use notificationHandler instead
 */
export const NotificationHandler = notificationHandler;
