import { IValidator } from '@Fluentvalidator/IValidator';
import { ValueValidationResult } from '@Fluentvalidator/ValueValidationResult';
import { Rule } from './Rule';

export class ValidatorRule<TModel, TValue> extends Rule<TModel, TValue> {
	constructor(validatorProducer: (model: TModel) => IValidator<TValue>) {
		super((value: TValue, model: TModel) =>
			value == null ? null : (validatorProducer(model).validate(value) as ValueValidationResult<TValue>)
		);
	}
}
