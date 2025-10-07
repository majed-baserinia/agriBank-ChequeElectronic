export interface IssueWithGroupRequest {
	isSequentional: boolean;
	issueChequeKey: string;
	withDrawalGroups: WithdrawalDetails;
}
export interface WithdrawalDetails {
	groupNumber: string;
	withdrawalGroups: WithdrawalGroups[];
}
interface WithdrawalGroups {
	customerNumber: number;
	firstName: string;
	lastName: string;
}
