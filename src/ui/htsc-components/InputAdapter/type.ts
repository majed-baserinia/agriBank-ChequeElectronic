import { InputProps, SxProps, TextFieldProps, Theme } from '@mui/material';

export type InputAdapterProps = {
	placeholder?: string;
	disabled?: boolean;
	sx?: SxProps;
	isRequired?: boolean;
	label: string;
	icon?: React.ReactNode;
	type?: 'cart' | 'money' | 'text' | 'password' | 'number';
	defaultValue?: string;
	onChange: (value: string) => void;
	muiTextFieldProps?: TextFieldProps;
	inputProps?: InputProps;
	error?: boolean;
	success?: boolean;
	size?: Size;
	helperText?: string;
	focused?: boolean
};

type Size = 'md' | 'lg' | 'sm';

export type Styles = {
	theme: Theme;
	success: boolean;
	error: boolean;
	size: Size;
};
