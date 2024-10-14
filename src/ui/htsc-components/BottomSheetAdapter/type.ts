import { ReactNode } from 'react';

export type Props = {
	open: boolean;
	setOpen: (val: boolean) => void;
	children: ReactNode;
	snapPoints?: number[];
};
