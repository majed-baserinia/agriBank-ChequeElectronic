/* eslint-disable @typescript-eslint/no-unused-vars */
import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { ValidationErrors, Validator } from '@Fluentvalidator/index';
import fluentValidationSettings from '@Fluentvalidator/settings';
import pipelineBehavior from '@Mediatr/attributes/pipeline.behavior.attribute.js';
import { IRequest, IRequestHandler, Mediator, mediatorSettings, requestHandler } from '@Mediatr/index.js';
import type IPipelineBehavior from '@Mediatr/interfaces/ipipeline.behavior.js';
import Resolver from '@Mediatr/models/resolver.js';

describe('Resolver with local container', () => {
	beforeEach(() => {
		mediatorSettings.resolver.clear();
		mediatorSettings.dispatcher.behaviors.clear();
	});

	test('Should resolve existing instance', async () => {
		// Arrange
		mediatorSettings.resolver = new Resolver();

		class Request {
			name?: string;
		}

		@requestHandler(Request)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		class HandlerTest implements IRequestHandler<Request, string> {
			handle(value: Request): Promise<string> {
				return Promise.resolve(`Value passed ${value.name}`);
			}
		}

		@pipelineBehavior()
		class PipelineBehaviorTest implements IPipelineBehavior {
			async handle(request: IRequest<unknown>, next: () => unknown): Promise<unknown> {
				if (request instanceof Request) {
					request.name += ' with stuff';
				}

				let result = await next();
				if (typeof result === 'string') {
					result += ' after';
				}

				return result;
			}
		}

		const r = new Request();
		r.name = 'Foo';

		// Act
		const mediator = new Mediator();
		const result = await mediator.send(r);

		// Assert
		expect(result).toBe('Value passed Foo with stuff after');
	});

	test('Should resolve existing instance', async () => {
		// Arrange
		mediatorSettings.resolver = new Resolver();

		class Request {
			name?: string;
		}

		@requestHandler(Request)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		class HandlerTest implements IRequestHandler<Request, string> {
			handle(value: Request): Promise<string> {
				return Promise.resolve(`Value passed ${value.name}`);
			}
		}

		@pipelineBehavior()
		class PipelineBehaviorTest1 implements IPipelineBehavior {
			async handle(request: IRequest<unknown>, next: () => unknown): Promise<unknown> {
				if (request instanceof Request) {
					request.name += ' with stuff 1';
				}

				let result = await next();
				if (typeof result === 'string') {
					result += ' after 1';
				}

				return result;
			}
		}

		@pipelineBehavior()
		class PipelineBehaviorTest2 implements IPipelineBehavior {
			async handle(request: IRequest<unknown>, next: () => unknown): Promise<unknown> {
				if (request instanceof Request) {
					request.name += ' with stuff 2';
				}

				let result = await next();
				if (typeof result === 'string') {
					result += ' after 2';
				}

				return result;
			}
		}

		const r = new Request();
		r.name = 'Foo';
		// Act
		const mediator = new Mediator();
		const result = await mediator.send(r);

		//Assert
		expect(result).toBe('Value passed Foo with stuff 2 with stuff 1 after 1 after 2');
	});

	test('Should throw validation exception', async () => {
		// Arrange
		mediatorSettings.resolver = new Resolver();

		fluentValidationSettings.resolver = new Resolver();

		class Request {
			name?: string;
			age?: number;
		}

		@requestHandler(Request)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		class HandlerTest implements IRequestHandler<Request, string> {
			handle(value: Request): Promise<string> {
				return Promise.resolve(`Value passed ${value.name}`);
			}
		}

		@fluentValidator(Request)
		class RequestValidator extends Validator<Request> {
			constructor() {
				super();
				this.ruleFor('name')
					.notNull()
					.withMessage('name must has value')
					.length(5, 10)
					.withMessage('name must between 5..10');

				this.ruleFor('age')
					.notNull()
					.withMessage('age must has value')
					.greaterThan(5)
					.withMessage('age must greater than 5');
			}
		}

		@fluentValidator(Request)
		class RequestValidator2 extends Validator<Request> {
			constructor() {
				super();
				this.ruleFor('name')
					.notNull()
					.withMessage('name must has value')
					.notEmpty()
					.withMessage('name must has value');
			}
		}

		@pipelineBehavior()
		class PipelineBehaviorTest1 implements IPipelineBehavior {
			async handle(request: IRequest<unknown>, next: () => unknown): Promise<unknown> {
				if (request instanceof Request) {
					request.name += ' with stuff 1';
				}

				let result = await next();
				if (typeof result === 'string') {
					result += ' after 1';
				}

				return result;
			}
		}

		@pipelineBehavior()
		class PipelineBehaviorTest2 implements IPipelineBehavior {
			async handle(request: IRequest<unknown>, next: () => unknown): Promise<unknown> {
				if (request instanceof Request) {
					request.name += ' with stuff 2';
				}

				let result = await next();
				if (typeof result === 'string') {
					result += ' after 2';
				}

				return result;
			}
		}

		@pipelineBehavior()
		class ValidationBehavior implements IPipelineBehavior {
			async handle(request: IRequest<unknown>, next: () => unknown): Promise<unknown> {
				const name = request.constructor.name;

				const validators = fluentValidationSettings.resolver.resolveMany<Validator<unknown>>(name);
				let failures: ValidationErrors<unknown> = {};
				for (let index = 0; index < validators.length; index++) {
					const failure = validators[index].validate(request);
					if (Object.keys(failure).length) {
						failures = Object.assign({}, failures, failure);
					}
				}

				if (Object.keys(failures).length) {
					throw new Error();
				}

				return await next();
			}
		}
		const r = new Request();
		r.age = 2;
		// Act
		const mediator = new Mediator();
		let exception = null;

		try {
			await mediator.send(r);
		} catch (e) {
			if (e instanceof Error) {
				exception = e;
			} else {
				throw e;
			}
		}
		expect(exception).not.toBeNull();
	});

	test('Should not throw validation exception', async () => {
		// Arrange
		mediatorSettings.resolver = new Resolver();

		fluentValidationSettings.resolver = new Resolver();

		class Request {
			name?: string | null;
			age?: number;
		}

		@requestHandler(Request)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		class HandlerTest implements IRequestHandler<Request, string> {
			handle(value: Request): Promise<string> {
				return Promise.resolve(`Value passed ${value.name}`);
			}
		}

		@fluentValidator(Request)
		class RequestValidator extends Validator<Request> {
			constructor() {
				super();
				this.ruleFor('name')
					.notNull()
					.withMessage('name must has value')
					.length(5, 10)
					.withMessage('name must between 5..10');

				this.ruleFor('age')
					.notNull()
					.withMessage('age must has value')
					.greaterThan(5)
					.withMessage('age must greater than 5');
			}
		}

		@fluentValidator(Request)
		class RequestValidator2 extends Validator<Request> {
			constructor() {
				super();
				this.ruleFor('name')
					.notNull()
					.withMessage('name must has value')
					.notEmpty()
					.withMessage('name must has value');
			}
		}

		@pipelineBehavior()
		class PipelineBehaviorTest1 implements IPipelineBehavior {
			async handle(request: IRequest<unknown>, next: () => unknown): Promise<unknown> {
				if (request instanceof Request) {
					request.name += ' with stuff 1';
				}

				let result = await next();
				if (typeof result === 'string') {
					result += ' after 1';
				}

				return result;
			}
		}

		@pipelineBehavior()
		class PipelineBehaviorTest2 implements IPipelineBehavior {
			async handle(request: IRequest<unknown>, next: () => unknown): Promise<unknown> {
				if (request instanceof Request) {
					request.name += ' with stuff 2';
				}

				let result = await next();
				if (typeof result === 'string') {
					result += ' after 2';
				}

				return result;
			}
		}

		@pipelineBehavior()
		class ValidationBehavior implements IPipelineBehavior {
			async handle(request: IRequest<unknown>, next: () => unknown): Promise<unknown> {
				const name = request.constructor.name;

				const validators = fluentValidationSettings.resolver.resolveMany<Validator<unknown>>(name);
				let failures: ValidationErrors<unknown> = {};
				for (let index = 0; index < validators.length; index++) {
					const failure = validators[index].validate(request);
					if (Object.keys(failure).length) {
						failures = Object.assign({}, failures, failure);
					}
				}

				if (Object.keys(failures).length) {
					throw new Error();
				}

				return await next();
			}
		}
		const r = new Request();
		r.name = 'PoeIsSage';
		r.age = 8;

		// Act
		const mediator = new Mediator();
		const result = await mediator.send(r);
	});
});
