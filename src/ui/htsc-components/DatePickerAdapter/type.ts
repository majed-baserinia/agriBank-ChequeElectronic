export type Props = {
	label?: string;
	className?: string;
	error?: boolean;
	helperText?: string;
	onChange: (value: string) => void;
	defaultValue?: string
};
