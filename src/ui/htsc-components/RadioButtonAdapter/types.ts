export type Props = {
	checked: boolean;
	value: string;
	label: string;
	disabled?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
