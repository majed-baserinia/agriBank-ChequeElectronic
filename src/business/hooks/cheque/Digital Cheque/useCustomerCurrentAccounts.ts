import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import CurrentAccountsCommand from 'business/application/cheque/Digital Cheque/CurrentAccounts/CurrentAccountsCommand';
import 'business/application/cheque/Digital Cheque/CurrentAccounts/CurrentAccountsHandler';

const mediator = new Mediator();

export default function useCustomerCurrentAccounts() {
	return useMutation({
		mutationFn: (data: { corporationCif: string; serviceName: string }) =>
			mediator.send(new CurrentAccountsCommand(data)),
	});
}
