import { ValidationErrors, Validator } from '@Fluentvalidator/index';
import fluentValidationSettings from '@Fluentvalidator/settings';
import { Field, FieldErrors, FieldValues, ResolverOptions, get, set } from 'react-hook-form';

async function fluentValidationResolver<T extends FieldValues>(
	values: FieldValues,
	context: T,
	options: ResolverOptions<T>
) {
	const name = context.name;

	const validators = fluentValidationSettings.resolver.resolveMany<Validator<unknown>>(name);
	let failures: ValidationErrors<unknown> = {};
	for (let index = 0; index < validators.length; index++) {
		const failure = validators[index].validate(values);
		if (Object.keys(failure).length) {
			failures = Object.assign({}, failures, failure);
		}
	}

	if (Object.keys(failures).length) {
		return {
			values: {},
			errors: toNestError(failures, options)
		};
	}

	return { values, errors: {} };
}

const toNestError = <TFieldValues extends FieldValues>(
	errors: ValidationErrors<unknown>,
	options: ResolverOptions<TFieldValues>
): FieldErrors<TFieldValues> => {
	const fieldErrors = {} as FieldErrors<TFieldValues>;
	for (const path in errors) {
		const field = get(options.fields, path) as Field['_f'] | undefined;
		const error = {
			type: path,
			message: errors[path as keyof unknown]
		};
		set(
			fieldErrors,
			path,
			Object.assign(error || {}, {
				ref: field && field.ref
			})
		);
	}

	return fieldErrors;
};

export default fluentValidationResolver;
