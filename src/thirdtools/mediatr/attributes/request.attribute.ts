/* eslint-disable @typescript-eslint/ban-types */
import { mediatorSettings } from '@Mediatr/index.js';
import type { IRequestClass } from '@Mediatr/interfaces/irequest.js';

/**
 * Decorate the requestHandler with this attribute
 *
 * @param value The request type
 */
const requestHandler = <T>(value: IRequestClass<T>) => {
	return (target: Function): void => {
		const name = (value as Function).prototype.constructor.name;
		mediatorSettings.resolver.add(name, target);
	};
};

export default requestHandler;
