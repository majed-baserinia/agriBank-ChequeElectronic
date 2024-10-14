import { Grid, useMediaQuery, useTheme } from '@mui/material';
import useFirstPageViewGenerator from 'business/hooks/cheque/transferCheck/useFirstPageViewGenerator';
import Menu from 'ui/components/Menu';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';

import Loader from 'ui/htsc-components/loader/Loader';
import { menuList } from 'ui/pages/HomePage/menuList';

export default function CheckNewInfo() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { view, isLoading } = useFirstPageViewGenerator();

	return (
		<Grid
			container
			sx={{ padding: matches ? '0' : '64px 0' }}
			justifyContent={'center'}
			gap={'24px'}
			dir={theme.direction}
		>
			<Grid
				item
				xs={12}
				md={8}
			>
				{view}
			</Grid>

			{matches ? null : (
				<Grid
					item
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<Menu
							divider={false}
							list={menuList.management}
						/>
						<Menu
							divider={false}
							list={menuList.services}
						/>
					</BoxAdapter>
				</Grid>
			)}
			<Loader showLoader={isLoading} />
		</Grid>
	);
}
