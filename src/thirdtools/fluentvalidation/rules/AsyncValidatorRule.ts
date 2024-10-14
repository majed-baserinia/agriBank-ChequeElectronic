import { IAsyncValidator } from '@Fluentvalidator/IAsyncValidator';
import { ValueValidationResult } from '@Fluentvalidator/ValueValidationResult';
import { AsyncRule } from './AsyncRule';

export class AsyncValidatorRule<TModel, TValue> extends AsyncRule<TModel, TValue> {
	constructor(validatorProducer: (model: TModel) => IAsyncValidator<TValue>) {
		super(async (value: TValue, model: TModel) =>
			value == null
				? Promise.resolve(null)
				: ((await validatorProducer(model).validateAsync(value)) as ValueValidationResult<TValue>)
		);
	}
}
