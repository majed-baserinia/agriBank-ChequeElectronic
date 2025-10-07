export default class CurrentAccountsCommand {
	corporationCif: string;
	serviceName: string;

	constructor(data: { corporationCif: string; serviceName: string }) {
		this.corporationCif = data.corporationCif;
		this.serviceName = data.serviceName;
	}
}
