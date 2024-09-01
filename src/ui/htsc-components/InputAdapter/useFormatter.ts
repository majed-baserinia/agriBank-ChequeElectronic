import { Theme } from '@mui/material';
import { InputType } from 'ui/htsc-components/InputAdapter/type';
import { filter } from 'ui/htsc-components/InputAdapter/utils';

type Options = {
	type: InputType;
	theme: Theme;
};
export function useFormatter({ type, theme }: Options) {
	return (value: string) => {
		return filter(type, theme, value);
	};
}
