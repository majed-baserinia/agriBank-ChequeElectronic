import type IDispatcher from '@Mediatr/interfaces/idispatcher.js';
import type IResolver from '@Mediatr/interfaces/iresolver.js';
import Dispatcher from '@Mediatr/models/dispatcher/index.js';
import Resolver from '@Mediatr/models/resolver.js';

/**
 * Contains the settings for the MediatR lib
 *
 * @class MediatrSettings
 */
class MediatrSettings {
	/**
	 * The resolver instance
	 * (default - Internal container)
	 * @type {IResolver}
	 * @memberof MediatrSettings
	 */
	resolver: IResolver;

	/**
	 * The dispatcher instance
	 * (default - Internal dispatcher )
	 * @type {IDispatcher}
	 * @memberof MediatrSettings
	 */
	dispatcher: IDispatcher;

	constructor() {
		this.resolver = new Resolver();
		this.dispatcher = new Dispatcher();
	}
}

const mediatorSettings = new MediatrSettings();
export default mediatorSettings;
