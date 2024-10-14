/* eslint-disable @typescript-eslint/ban-types */
import { IRequest, IRequestHandler, IResolver, Mediator, mediatorSettings, requestHandler } from '@Mediatr/index.js';
import { Container, inject, injectable } from 'inversify';
import 'reflect-metadata';

describe('The full example', () => {
	const container = new Container();

	// inversify.resolver.ts -> Implement the resolver
	class InversifyResolver implements IResolver {
		resolve<T>(name: string): T {
			return container.get(name);
		}
		resolveMany<T>(name: string): T[] {
			return container.get(name);
		}
		add(name: string, instance: Function): void {
			container.bind(name).to(instance as never);
		}

		remove(name: string): void {
			// not necessary- can be blank, never called by the lib, for debugging / testing only
			container.unbind(name);
		}

		clear(): void {
			// not necessary- can be blank, never called by the lib, for debugging / testing only
			container.unbindAll();
		}
	}

	// Set the resolver of MediatR-TS
	mediatorSettings.resolver = new InversifyResolver();

	// You can later configure the inversify container
	interface IWarrior {
		fight(): string;
	}

	const TYPES = {
		IWarrior: Symbol.for('IWarrior')
	};

	@injectable()
	class Ninja implements IWarrior {
		fight(): string {
			return 'ninja fight';
		}
	}

	container.bind<IWarrior>(TYPES.IWarrior).to(Ninja);

	// The request object
	class Request implements IRequest<number> {
		public thenumber: number;

		constructor(thenumber: number) {
			this.thenumber = thenumber;
		}
	}

	// Decorate the handler request with Handler and injectable attribute, notice the warrior property
	@requestHandler(Request)
	@injectable()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	class HandlerRequest implements IRequestHandler<Request, string> {
		@inject(TYPES.IWarrior)
		public warrior!: IWarrior; // Instantiated by the inversify

		public handle(value: Request): Promise<string> {
			return Promise.resolve(`We has ${value.thenumber} ${this.warrior.fight()}`);
		}
	}

	test('Should resolve existing instance', async () => {
		const mediator = new Mediator();
		const result = await mediator.send<string>(new Request(99));

		expect(result).toBe('We has 99 ninja fight');
	});
});
