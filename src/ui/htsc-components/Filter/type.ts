export type Props<T extends Record<any, unknown>> = {
	data: T[];
	filters: FilterType<T>[];
	getFilteredData: (filteredData: T[]) => void;
};

export type DropDownItem = { key: string; value: string; selected: boolean };

export type FilterType<T> = {
	label: string;
	filterTitle: string;
	list: DropDownItem[];
	filterFunction?: (list: T[], selectedValue: string) => T[];
};
