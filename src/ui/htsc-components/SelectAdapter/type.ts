import { SelectProps } from '@mui/material';
import { ReactNode } from 'react';

export type Props = {
	label?: string;
	helperText?: string;
	error?: boolean;
	disabled?: boolean;
	isRequired?: boolean;
	renderValue?: boolean;
	icon?: ReactNode;
	children: ReactNode[] | ReactNode;
	onChange: (value: string) => void;
	muiSelectProps?: SelectProps;
	defaultValue?: string;
	size?: 'small' | 'medium';
};
