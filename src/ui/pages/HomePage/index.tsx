import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Menu from 'ui/components/Menu';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import BreadcrumbsAdapter from 'ui/htsc-components/BreadcrumbsAdapter';

import { menuList } from './menuList';

const breadcrumbs = [
	{
		title: 'accountServices',
		key: '1',
		href: '/'
	},
	{
		title: 'electronicCheck',
		key: '2',
		href: '/'
	}
];
export default function HomePage() {
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	
	return (
		<Grid
			container
			direction={'column'}
			gap={'24px'}
			sx={{ minHeight: 'calc(100% - 128px)', padding: matches ? '16px' : '64px' }}
		>
			<BoxAdapter>
				<BreadcrumbsAdapter breadcrumbs={breadcrumbs} />
				<Grid
					dir={theme.direction}
					container
					direction={'column'}
					gap={'56px'}
				>
					<Menu
						list={menuList.services}
						menuTitle={'menuTitleServices'}
					/>
				</Grid>
			</BoxAdapter>
			<BoxAdapter>
				<Grid
					dir={theme.direction}
					container
					direction={'column'}
					gap={'56px'}
				>
					<Menu
						list={menuList.management}
						menuTitle={'menuTitleManagement'}
					/>
				</Grid>
			</BoxAdapter>
		</Grid>
	);
}
