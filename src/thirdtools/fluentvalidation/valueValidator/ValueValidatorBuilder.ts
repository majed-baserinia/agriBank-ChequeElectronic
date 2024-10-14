import { ValueValidationResult } from '@Fluentvalidator/ValueValidationResult';
import { ValueValidator } from '@Fluentvalidator/ValueValidator';
import { Rule } from '@Fluentvalidator/rules/Rule';
import { CoreValueValidatorBuilder } from './CoreValueValidatorBuilder';
import { ValueTransformer } from './ValueTransformer';
import { hasError } from './ValueValidator';

export class ValueValidatorBuilder<
	TModel,
	TValue,
	TTransformedValue extends TValue | string | number | boolean | null | undefined | symbol
> extends CoreValueValidatorBuilder<TModel, TValue, TTransformedValue> {
	constructor(rebuildValidate: () => void, transformValue: ValueTransformer<TValue, TTransformedValue>) {
		super(rebuildValidate, transformValue);
	}

	public build = (): ValueValidator<TModel, TValue> => {
		return (value: TValue, model: TModel): ValueValidationResult<TValue> => {
			const transformedValue = this.transformValue(value);

			for (const rule of this.rules) {
				const validationResult = (rule.rule as Rule<TModel, TTransformedValue>).validate(
					transformedValue,
					model
				) as ValueValidationResult<TValue>;

				if (hasError(validationResult)) {
					return validationResult;
				}
			}

			return null;
		};
	};

	public getAllRules = () => {
		return {
			...this._getAllRules()
		};
	};
}
