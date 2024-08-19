import type Glide from '@glidejs/glide';
import { Theme, useTheme } from '@mui/material';
import React, { useRef } from 'react';
import OptionsContext from 'ui/htsc-components/Carousel/Context/OptionsContext';
import { GlideEvents } from 'ui/htsc-components/Carousel/events';
import { GlideOptions } from 'ui/htsc-components/Carousel/options';
import { useInitializeGlider } from 'ui/htsc-components/Carousel/Root/useInitializeGlider';
import Track from 'ui/htsc-components/Carousel/Track/Track';
import styles from './styles.module.css';

export type Props = GlideOptions &
	GlideEvents & {
		className?: string;
		children: React.ReactNode;
	};

export default function Root({ className, setDefaultOptions = true, children, ...options }: Props) {
	const rootRef = useRef<HTMLDivElement>(null);
	const theme = useTheme();
	const { glide } = useInitializeGlider(rootRef, getGliderOptions(theme, options, setDefaultOptions));

	if (options.focusActiveSlide?.enabled) {
		className += ` ${styles['focus-center']}`;
	}

	return (
		<OptionsContext.Provider value={options}>
			<div
				className="glide"
				ref={rootRef}
				style={
					{
						'--inactive-slide-opacity': options.focusActiveSlide?.inactiveSlideOpacity ?? 0.5,
						'--scaling-factor': options.focusActiveSlide?.scalingFactor ?? 1.2
					} as React.CSSProperties
				}
			>
				<Track className={className}>{children}</Track>
			</div>
		</OptionsContext.Provider>
	);
}

function getGliderOptions(theme: Theme, options: Partial<Glide.Options>, setDefaultOptions: boolean) {
	return setDefaultOptions
		? {
				direction: theme.direction,
				...options
			}
		: options;
}
