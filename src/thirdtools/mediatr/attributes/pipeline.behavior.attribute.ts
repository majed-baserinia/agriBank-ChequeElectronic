/* eslint-disable @typescript-eslint/ban-types */

import { mediatorSettings } from '@Mediatr/index.js';
import type { IPipelineBehaviorClass } from '@Mediatr/interfaces/ipipeline.behavior.js';

/**
 * Decorate the pipelineBehavior with this attribute
 *
 * @param value The request type
 */
const pipelineBehavior = () => {
	return (target: Function): void => {
		mediatorSettings.dispatcher.behaviors.add({
			behavior: target as IPipelineBehaviorClass
		});
	};
};

export default pipelineBehavior;
