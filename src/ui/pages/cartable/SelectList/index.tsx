import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import useGetAllRelatedCustomers from 'business/hooks/cheque/checklist/useGetAllRelatedCustomers';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import BreadcrumbsAdapter from 'ui/htsc-components/BreadcrumbsAdapter';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';

type MenuItems = {
	id: number;
	title: string;
	subtitle: string;
	routeTo: string;
}[];
export const breadcrumbs = [
	{
		title: 'accountServices',
		key: '1',
		href: '/'
	},
	{
		title: 'electronicCheck',
		key: '2',
		href: '/'
	},
	{
		title: 'receivedCheckList',
		key: '3',
		href: '/'
	}
];

export default function SelectList() {
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	const {addNewCartableData} = useCartableChecklistData((store) => store);
	const { data: listItems, isLoading } = useGetAllRelatedCustomers('checkList');
	const [menuItems, setMenuItems] = useState<MenuItems>([]);


	useEffect(() => {
		//set the new list to the store
		addNewCartableData({ relatedCustomers: listItems });

		if (listItems?.length === 1)
			navigate(paths.cartable.CartableList + '?cif=' + listItems[0].customerNumber, { replace: true });

		const newList = listItems?.map((item, index) => {
			return {
				id: item.customerNumber,
				title: index === 0 ? 'myChecks' : item.fullName,
				subtitle: index === 0 ? 'myChecksSubtitle' : 'othersChecksSubtitle',
				routeTo: `${paths.cartable.CartableList}?cif=${item.customerNumber}`
			};
		});

		if (newList) {
			setMenuItems(newList);
		}
	}, [listItems]);

	//display the loader this way to user becouse user shouldn't see the page if there is no Checks that user represent or sign.
	if (isLoading) return <Loader showLoader />;

	return (
		<Grid sx={{ padding: matches ? '0' : '64px' }}>
			<BoxAdapter fullWidth={matches}>
				<Grid
					sx={{
						minHeight: matches ? '100vh' : 'calc(100% - 128px)',
						padding: matches ? '0' : '16px'
					}}
					container
					direction={'column'}
					gap={'24px'}
				>
					<BreadcrumbsAdapter breadcrumbs={breadcrumbs} />
					<Grid
						container
						gap={'8px'}
					>
						<SvgToIcon
							icon={infoIcon}
							alt="info"
						/>
						<Typography
							variant="bodyMd"
							sx={{ color: theme.palette.text.secondary }}
						>
							{t('checkListsMenuText')}
						</Typography>
					</Grid>
					<Grid
						dir={theme.direction}
						container
						direction={'column'}
						gap={'56px'}
					>
						<Menu list={menuItems} />
					</Grid>
				</Grid>
			</BoxAdapter>
		</Grid>
	);
}
