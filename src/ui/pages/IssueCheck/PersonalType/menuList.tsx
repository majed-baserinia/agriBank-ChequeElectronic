import activation from 'assets/icon/menu/active-check.svg';
import issueCheck from 'assets/icon/menu/check-issue.svg';
import deactivation from 'assets/icon/menu/deactive-check.svg';
import list from 'assets/icon/menu/list.svg';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { paths } from 'ui/route-config/paths';

export const menuList = {
	personalTypes: [
		{
			id: '1',
			title: 'IndividualCheque',
			miniSubtitle: "IndividualRequestSubtitle",
			routeTo: paths.IssueCheck.SelectAccountPath
		},
		{
			id: '2',
			title: 'CorporateCheque',
			miniSubtitle: "CorporateRequestSubtitle",
			routeTo: paths.cartable.SelectList
		}
	]
};
