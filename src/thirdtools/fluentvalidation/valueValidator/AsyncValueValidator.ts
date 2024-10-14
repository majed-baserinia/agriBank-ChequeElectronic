import { ValueValidationResult } from '@Fluentvalidator/ValueValidationResult';

export type AsyncValueValidator<TModel, TValue, TTransformedValue> = (
	value: TValue,
	model: TModel
) => Promise<ValueValidationResult<TTransformedValue>>;
