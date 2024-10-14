import { ReactNode } from 'react';

export type Props = {
	label: string;
	size?: 'small' | 'medium';
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	icon?: ReactNode;
	color?: 'primary' | 'default' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
	count?: number;
	variant?: 'outlined' | 'filled';
};
