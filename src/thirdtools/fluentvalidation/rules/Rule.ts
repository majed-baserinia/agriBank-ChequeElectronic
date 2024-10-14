import { ValueValidationResult } from '@Fluentvalidator/ValueValidationResult';
import { ValueValidator } from '@Fluentvalidator/ValueValidator';
import { CoreRule } from './CoreRule';

export class Rule<TModel, TValue> extends CoreRule<TModel> {
	private readonly valueValidator: ValueValidator<TModel, TValue>;

	constructor(valueValidator: ValueValidator<TModel, TValue>) {
		super();
		this.valueValidator = valueValidator;
	}

	public validate = (value: TValue, model: TModel): ValueValidationResult<TValue> => {
		if (this.whenCondition != null && !this.whenCondition(model)) {
			return null;
		}

		if (this.unlessCondition != null && this.unlessCondition(model)) {
			return null;
		}

		const errorOrNull = this.valueValidator(value, model);
		return errorOrNull != null ? this.customErrorMessage || errorOrNull : null;
	};
}
