import { IAsyncValidator } from '@Fluentvalidator/IAsyncValidator';
import { ValueValidationResult } from '@Fluentvalidator/ValueValidationResult';
import { AsyncRule } from '@Fluentvalidator/rules/AsyncRule';
import { AsyncValidatorRule } from '@Fluentvalidator/rules/AsyncValidatorRule';
import { MustAsyncRule } from '@Fluentvalidator/rules/MustAsyncRule';
import { Rule } from '@Fluentvalidator/rules/Rule';
import { AsyncValueValidator } from './AsyncValueValidator';
import { CoreValueValidatorBuilder } from './CoreValueValidatorBuilder';
import { ValueTransformer } from './ValueTransformer';
import { hasError } from './ValueValidator';

export class AsyncValueValidatorBuilder<TModel, TValue, TTransformedValue> extends CoreValueValidatorBuilder<
	TModel,
	TValue,
	TTransformedValue
> {
	constructor(rebuildValidateAsync: () => void, transformValue: ValueTransformer<TValue, TTransformedValue>) {
		super(rebuildValidateAsync, transformValue);
	}

	public build = (): AsyncValueValidator<TModel, TValue, TTransformedValue> => {
		return async (value: TValue, model: TModel): Promise<ValueValidationResult<TTransformedValue>> => {
			const transformedValue = this.transformValue(value);

			for (const rule of this.rules) {
				const validationResult = rule.isAsync
					? await (rule.rule as AsyncRule<TModel, TTransformedValue>).validateAsync(transformedValue, model)
					: (rule.rule as Rule<TModel, TTransformedValue>).validate(transformedValue, model);

				if (hasError(validationResult)) {
					return validationResult;
				}
			}

			return null;
		};
	};

	public mustAsync = (
		definition:
			| ((value: TTransformedValue, model: TModel) => Promise<boolean>)
			| {
					predicate: (value: TTransformedValue, model: TModel) => Promise<boolean>;
					message: string | ((value: TTransformedValue, model: TModel) => string);
			  }
			| Array<
					| ((value: TTransformedValue, model: TModel) => Promise<boolean>)
					| {
							predicate: (value: TTransformedValue, model: TModel) => Promise<boolean>;
							message: string | ((value: TTransformedValue, model: TModel) => string);
					  }
			  >
	) => {
		const asyncMustRule = new MustAsyncRule<TModel, TTransformedValue>(definition);
		this.pushAsyncRule(asyncMustRule);
		return this.getAllRulesAndExtensions();
	};

	public setAsyncValidator = (validatorProducer: (model: TModel) => IAsyncValidator<TTransformedValue>) => {
		const asyncValidatorRule = new AsyncValidatorRule<TModel, TTransformedValue>(
			validatorProducer as (model: TModel) => IAsyncValidator<TTransformedValue>
		);
		this.pushAsyncRule(asyncValidatorRule);
		return this.getAllRulesAndExtensions();
	};

	public getAllRules = () => {
		return {
			...this._getAllRules(),
			mustAsync: this.mustAsync,
			setAsyncValidator: this.setAsyncValidator
		};
	};
}
