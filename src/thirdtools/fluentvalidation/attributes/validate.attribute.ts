/* eslint-disable @typescript-eslint/ban-types */
import fluentValidationSettings from '@Fluentvalidator/settings';

/**
 * Decorate the requestHandler with this attribute
 *
 * @param value The request type
 */
const fluentValidator = (value: Function) => {
	return (target: Function): void => {
		const name = value.prototype.constructor.name;
		fluentValidationSettings.resolver.add(name, target);
	};
};

export default fluentValidator;
