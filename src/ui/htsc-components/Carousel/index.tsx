import '@glidejs/glide/dist/css/glide.core.css';
import Root from './Root/Root';
import Slide from './Slide/Slide';

/**
 * A carousel using glidejs under the hood, for more info please refer to glidejs docs.
 * * Although you can use anything to create rows in this carousel but its highly discouraged to do so, always use the `Slide`
 *   component
 */
export default {
	Root: Root,
	Slide: Slide
};
