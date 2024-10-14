import { ValueValidationResult } from '@Fluentvalidator/ValueValidationResult';
import { AsyncValueValidator } from '@Fluentvalidator/valueValidator/AsyncValueValidator';
import { CoreRule } from './CoreRule';

export class AsyncRule<TModel, TValue> extends CoreRule<TModel> {
	private readonly asyncValueValidator: AsyncValueValidator<TModel, TValue, TValue>;

	constructor(asyncValueValidator: AsyncValueValidator<TModel, TValue, TValue>) {
		super();
		this.asyncValueValidator = asyncValueValidator;
	}

	public validateAsync = async (value: TValue, model: TModel): Promise<ValueValidationResult<TValue>> => {
		if (this.whenCondition != null && !this.whenCondition(model)) {
			return null;
		}

		if (this.unlessCondition != null && this.unlessCondition(model)) {
			return null;
		}

		const errorOrNull = await this.asyncValueValidator(value, model);
		return errorOrNull != null ? this.customErrorMessage || errorOrNull : null;
	};
}
