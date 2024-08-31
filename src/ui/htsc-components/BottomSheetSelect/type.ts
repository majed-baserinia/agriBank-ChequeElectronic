export type Props<T extends { value: string; name: string }> = {
	list: T[];
	label: string;
	breackpoint?: 'md' | 'sm' | 'lg' | 'xs';
	defaultValue?: string;
	onChange: (item: T) => void;
	isRequired?: boolean;
	error?: boolean;
	helperText?: string;
};
