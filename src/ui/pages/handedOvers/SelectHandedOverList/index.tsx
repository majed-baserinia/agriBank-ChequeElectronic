import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import useGetAllRelatedCustomers from 'business/hooks/cheque/checklist/useGetAllRelatedCustomers';
import { useHandedOversData } from 'business/stores/handedOverChecks/useHandedOversStore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import BreadcrumbsAdapter from 'ui/htsc-components/BreadcrumbsAdapter';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { Loader, useLoadingHandler } from "@agribank/ui/components/Loader";
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
		title: 'transferedChecksMenuTitle',
		key: '3',
		href: '/'
	}
];

export default function SelectHandedOverList() {
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	const { addNewStoreData } = useHandedOversData((store) => store);
	const { data: relatedCustomers, isLoading } = useGetAllRelatedCustomers('checkList');
	const [menuItems, setMenuItems] = useState<MenuItems>([]);

	useEffect(() => {
		if (relatedCustomers) {
			addNewStoreData({ selectListPage: { relatedCustomers: relatedCustomers } });
			console.log({ relatedCustomers });

			if (relatedCustomers.length === 1) {
				navigate(paths.HandedOvers.HandedOverList + '?cif=' + relatedCustomers[0].customerNumber, {
					replace: true
				});
			} else {
				const newList = relatedCustomers.map((item, index) => {
					return {
						id: item.customerNumber,
						title: index === 0 ? 'myChecks' : item.fullName,
						subtitle: index === 0 ? 'myChecksSubtitle' : 'othersChecksSubtitle',
						routeTo: `${paths.HandedOvers.HandedOverList}?cif=${item.customerNumber}`
					};
				});

				setMenuItems(newList);
			}
		}
	}, [relatedCustomers]);

	//display the loader this way to user because user shouldn't see the page if there is no Checks that user represent or sign.
	// if (isLoading) return <Loader showLoader />;
	useLoadingHandler(isLoading);

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
