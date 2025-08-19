import { Grid, useMediaQuery, useTheme } from '@mui/material';
import Menu from 'ui/components/Menu';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';

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
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Grid
			container
			direction={'column'}
			gap={'24px'}
			sx={{ minHeight: 'calc(100% - 128px)', padding: matches ? '8px' : '64px' }}
		>
			<BoxAdapter muiPaperProps={{ sx: { padding: '16px', minWidth: '25%', borderRadius: '32px' } }}>
				{/* <BreadcrumbsAdapter breadcrumbs={breadcrumbs} /> */}
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
			{/* <BoxAdapter muiPaperProps={{ sx: { padding: '16px', minWidth: '25%', borderRadius: '32px' } }}>
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
			</BoxAdapter> */}
			{/* <BoxAdapter muiPaperProps={{ sx: { padding: '16px', minWidth: '25%', borderRadius: '32px' } }}>
				<Grid
					dir={theme.direction}
					container
					direction={'column'}
					gap={'56px'}
				>
					<Menu
						list={menuList.guide}
						menuTitle={'guide'}
					/>
				</Grid>
			</BoxAdapter> */}
		</Grid>
	);
}
