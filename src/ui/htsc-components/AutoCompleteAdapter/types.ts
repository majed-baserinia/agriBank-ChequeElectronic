import { ButtonProps } from "@mui/material";
import { HTMLAttributes, MutableRefObject, ReactNode } from "react";

export type Props<T extends Record<any, unknown>> = {
	options?: T[];
	label: string;
	error?: boolean;
	loading?: boolean;
	isRequired?: boolean;
	hasConfirmButton?: boolean;
	helperText?: string;
	onChange: (value: string | T | null) => void;
	onInputChange: (value: string) => void;
	inputMode?: 'search' | 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
	renderOption?: (props: HTMLAttributes<HTMLLIElement>, option: T | string) => ReactNode;
	muiButtonProps?: ButtonProps;
	valueToShowToInput: (option: T) => { text: string; icon?: ReactNode };
	isOptionEqualToValue: (option: T, value: T) => boolean;
};


export type RenderInputProps = {
	error?: boolean;
	label: string;
	isRequired?: boolean;
	loading?: boolean;
	helperText?: string;
	inputMode?: 'search' | 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
	inputRef: MutableRefObject<undefined>;
};