import type IResolver from '@Mediatr/interfaces/iresolver.js';
import Resolver from '@Mediatr/models/resolver.js';

/**
 * Contains the settings for the MediatR lib
 *
 * @class MediatrSettings
 */
class FluentValidationSettings {
	/**
	 * The resolver instance
	 * (default - Internal container)
	 * @type {IResolver}
	 * @memberof MediatrSettings
	 */
	resolver: IResolver;

	constructor() {
		this.resolver = new Resolver();
	}
}

const fluentValidationSettings = new FluentValidationSettings();
export default fluentValidationSettings;
