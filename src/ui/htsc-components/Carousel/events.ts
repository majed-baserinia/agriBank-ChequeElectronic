import Glide from '@glidejs/glide';

type DefaultEvents =
	| 'run.after'
	| 'run.before'
	| 'run.start'
	| 'run.end'
	| 'run.offset'
	| 'mount.before'
	| 'mount.after'
	| 'build.before'
	| 'build.after'
	| 'update'
	| 'destroy'
	| 'play'
	| 'pause';

type MappedEvent<T extends string> = T extends `${infer X}.${infer Y}`
	? `on${Capitalize<Y>}${Capitalize<X>}`
	: `on${Capitalize<T>}`;

type MappedEvents = {
	[K in DefaultEvents as MappedEvent<K>]: K;
};

export type Callback = (glide: Glide, ...args: any) => void;

export type GlideEvents = {
	[K in keyof MappedEvents as K]?: Callback;
};

const MAPPED_EVENTS: { [K in DefaultEvents as K]: MappedEvent<K> } = {
	'run.after': 'onAfterRun',
	'run.before': 'onBeforeRun',
	'run.start': 'onStartRun',
	'run.end': 'onEndRun',
	'run.offset': 'onOffsetRun',
	'mount.after': 'onAfterMount',
	'mount.before': 'onBeforeMount',
	'build.before': 'onBeforeBuild',
	'build.after': 'onAfterBuild',
	update: 'onUpdate',
	destroy: 'onDestroy',
	play: 'onPlay',
	pause: 'onPause'
};

export function mappedEventToGlideEvent(name: string): DefaultEvents {
	const originalEventName = Object.entries(MAPPED_EVENTS).find(([key, value]) => value == name);
	if (!originalEventName) {
		throw new Error(`cannot map "${name}" to a glidejs event`);
	}
	return originalEventName[0] as DefaultEvents;
}

export function addEventListener(instance: Glide, name: string, callback: Callback) {
	instance.on(mappedEventToGlideEvent(name), (...args: any) => {
		callback(instance, ...args);
	});
}
