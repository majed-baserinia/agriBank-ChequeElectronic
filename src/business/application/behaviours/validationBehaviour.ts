import { ValidationErrors, Validator } from '@Fluentvalidator/index';
import fluentValidationSettings from '@Fluentvalidator/settings';
import pipelineBehavior from '@Mediatr/attributes/pipeline.behavior.attribute';
import { IRequest } from '@Mediatr/index';
import IPipelineBehavior from '@Mediatr/interfaces/ipipeline.behavior';

@pipelineBehavior()
export class ValidationBehaviour implements IPipelineBehavior {
	async handle(request: IRequest<unknown>, next: () => unknown): Promise<unknown> {
		const name = request.constructor.name;

		const validators = fluentValidationSettings.resolver.resolveMany<Validator<unknown>>(name);
		let failures: ValidationErrors<unknown> = {};
		for (let index = 0; index < validators.length; index++) {
			const failure = validators[index].validate(request);
			if (Object.keys(failure).length) {
				failures = Object.assign({}, failures, failure);
			}
		}

		if (Object.keys(failures).length) {
			throw new Error();
		}

		return await next();
	}
}
