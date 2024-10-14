import { ValueValidationResult } from '@Fluentvalidator/ValueValidationResult';

export type ValueValidator<TModel, TValue> = (value: TValue, model: TModel) => ValueValidationResult<TValue>;
