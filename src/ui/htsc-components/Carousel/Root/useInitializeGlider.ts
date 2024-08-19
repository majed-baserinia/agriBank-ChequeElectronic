import Glide from '@glidejs/glide';
import { RefObject, useEffect, useState } from 'react';
import { addEventListener, Callback, GlideEvents } from 'ui/htsc-components/Carousel/events';
import { GlideOptions } from 'ui/htsc-components/Carousel/options';

export function useInitializeGlider(element: RefObject<HTMLElement>, options: GlideOptions & GlideEvents) {
	const [glide, setGlide] = useState<Glide | null>(null);

	useEffect(() => {
		const glide = new Glide(element.current!, options);

		const events = Object.entries(options).filter(([key, _]) => {
			return key.startsWith('on');
		}) as any as [keyof GlideEvents, Callback][];

		events.forEach(([key, value]) => {
			addEventListener(glide, key, value);
		});

		glide.mount();
		setGlide(glide);

		return () => {
			glide.destroy();
			setGlide(null);
		};
	}, [element.current]);

	return { glide };
}
