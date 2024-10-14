import { InputType } from 'ui/htsc-components/InputAdapter/type';
import { filter } from 'ui/htsc-components/InputAdapter/utils';

type Options = {
	type: InputType;
};
export function useFormatter({ type }: Options) {
	return (value: string) => {
		return filter(type, value);
	};
}
