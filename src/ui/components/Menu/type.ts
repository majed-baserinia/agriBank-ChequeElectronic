import { ReactNode } from 'react';

type Item = {
	title: string;
	subtitle?: string;
	icon?: ReactNode;
	routeTo?: string;
	onClick?: () => void;
};
export interface Props {
	list: Item[];
	menuTitle?: string;
	setOpen?: any;
	divider?: boolean;
}
