import { Grid, Typography } from '@mui/material';
import { Props } from './types';

export default function OverviewItem(props: Props) {
	const { title, value, sx } = props;
	return (
		<Grid
			container
			justifyContent={'space-between'}
			alignItems={'center'}
			sx={sx}
		>
			<Typography
				variant="bodySm"
				fontWeight={'medium'}
			>
				{title}
			</Typography>
			<Typography variant="bodySm">{value}</Typography>
		</Grid>
	);
}
