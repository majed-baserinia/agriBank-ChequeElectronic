export type ErrorType<T> = {
	type: string;
	title: string;
	status: number;
	detail: string;
	errors?: Record<keyof T, string[] | undefined>;
	instance: string | null;
};
