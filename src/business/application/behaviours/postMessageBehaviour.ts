import pipelineBehavior from '@Mediatr/attributes/pipeline.behavior.attribute';
import { IRequest } from '@Mediatr/index';
import IPipelineBehavior from '@Mediatr/interfaces/ipipeline.behavior';

@pipelineBehavior()
export class PostMessageBehaviour implements IPipelineBehavior {
	async handle(_: IRequest<unknown>, next: () => unknown): Promise<unknown> {
		if (window.self !== window.top) {
			const parentWindow = window.parent;
			parentWindow.postMessage({ type: 'iFrameStillAlive', data: 'I am still working' }, '*');
		}

		return await next();
	}
}
