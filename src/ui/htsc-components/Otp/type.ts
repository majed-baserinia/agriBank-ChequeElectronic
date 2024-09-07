export type Props = {
	maxLength?: number;
	onChange: (value: string) => void;
	helperText?: string;
	defaultValue?: string;
	error?: boolean;
	label: string;
	handleResend: () => void;
	timerInSeconds?: {
		timer: number
	}
};
