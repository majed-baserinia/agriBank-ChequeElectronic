import { ValueValidationResult } from '@Fluentvalidator/ValueValidationResult';

export type ValidationErrors<TModel> = {
	[propertyName in keyof TModel]?: ValueValidationResult<TModel[propertyName]>;
};
