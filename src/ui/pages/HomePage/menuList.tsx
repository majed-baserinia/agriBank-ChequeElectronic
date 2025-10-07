import activation from 'assets/icon/menu/active-check.svg';
import issueCheck from 'assets/icon/menu/check-issue.svg';
import deactivation from 'assets/icon/menu/deactive-check.svg';
import list from 'assets/icon/menu/list.svg';
import transferedCheksIcon from 'assets/icon/menu/transferedCheksIcon.svg';
import transferedCheksIconDown from 'assets/icon/menu/transferedCheksIconDown.svg';
import checkInquiry from 'assets/icon/menu/checkInquiry.svg';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { paths } from 'ui/route-config/paths';

export const menuList = {
	services: [
		{
			id: '1',
			title: 'issueCheck',
			icon: (
				<SvgToIcon
					icon={issueCheck}
					alt="issue Check"
				/>
			),
			routeTo: paths.IssueCheck.AccountTypePath
		},
		{
			id: '2',
			title: 'receivedCheckList',
			icon: (
				<SvgToIcon
					icon={list}
					alt="list check"
				/>
			),
			routeTo: paths.cartable.SelectList
		},
		{
			id: '3',
			title: 'transferedChecksMenuTitle',
			icon: (
				<SvgToIcon
					icon={transferedCheksIcon}
					alt="transfered Cheks Icon"
				/>
			),
			routeTo: paths.HandedOvers.SelectHandedOverList
		},
		// {
		// 	id: '4',
		// 	title: 'registerCheckRequest',
		// 	icon: (
		// 		<SvgToIcon
		// 			icon={transferedCheksIconDown}
		// 			alt="transfered Cheks Icon"
		// 		/>
		// 	),
		// 	routeTo: paths.HandedOvers.SelectHandedOverList
		// },
		// {
		// 	id: '5',
		// 	title: 'checkInquiryByIssuer',
		// 	icon: (
		// 		<SvgToIcon
		// 			icon={checkInquiry}
		// 			alt="checkInquiryByIssuer Icon"
		// 		/>
		// 	),
		// 	routeTo: paths.HandedOvers.SelectHandedOverList
		// }
	],
	management: [
		// {
		// 	id: '1',
		// 	title: 'activation',
		// 	icon: (
		// 		<SvgToIcon
		// 			icon={activation}
		// 			alt="activation"
		// 		/>
		// 	),
		// 	routeTo: paths.Activation.firstStepPath
		// },
		// {
		// 	id: '2',
		// 	title: 'deactivation',
		// 	icon: (
		// 		<SvgToIcon
		// 			icon={deactivation}
		// 			alt="deactivation"
		// 		/>
		// 	),
		// 	routeTo: paths.Deactivation
		// }
	]
	// guide: [
	// 	{
	// 		id: '1',
	// 		title: 'chakadGuide',
	// 		icon: (
	// 			<SvgToIcon
	// 				icon={infoIcon}
	// 				alt="chakadGuide"
	// 			/>
	// 		),
	// 		routeTo: paths.guide
	// 	}
	// ]
};
