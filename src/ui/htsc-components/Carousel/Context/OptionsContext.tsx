import { createContext } from 'react';
import type { GlideOptions } from 'ui/htsc-components/Carousel/options';

export const OptionsContext = createContext<GlideOptions | null>(null);
export default OptionsContext;
