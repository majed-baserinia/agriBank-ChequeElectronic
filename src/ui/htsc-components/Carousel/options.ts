export type GlideOptions = Partial<Glide.Options> & {
	/**
	 * sets sensible defaults for the carousel root.
	 * for instance sets the direction based on theme
	 */
	setDefaultOptions?: boolean;
	/**
	 * creates a focus effect on the active slide by reducing the opacity of none-active slides and
	 * scaling the active one
	 * * this will wrap `Slide` components in an additional div
	 */
	focusActiveSlide?: {
		enabled: true;
		/**
		 * the scaling factor of active element
		 */
		scalingFactor?: number;
		inactiveSlideOpacity?: number;
	};
};
