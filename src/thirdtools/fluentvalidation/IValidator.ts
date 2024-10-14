import { ValidationErrors } from '@Fluentvalidator/ValidationErrors';

export interface IValidator<TModel> {
	validate: (model: TModel) => ValidationErrors<TModel>;
}
