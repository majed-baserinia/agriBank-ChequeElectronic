import { GetAllRelatedCustomersResponse } from 'common/entities/cheque/chekList/GetAllRelatedCustomers/GetAllRelatedCustomersResponse';

export type Props = {
	relatedCustomers: GetAllRelatedCustomersResponse;
	onFilter: (options: filterOptions) => void;
};

export type filterOptions = {
	customerNumber?: number;
	status?: number;
	serial?: string;
	accountNumber?: number;
};

export type InputValues = {
	category?: { value: string; label: string };
	status?: { value: string; label: string };
	serial?: { value: string; label: string };
	accountNumber?: { value: string; label: string };
};
