import { Grid, Typography } from '@mui/material';
import { Props } from './types';

export default function OverviewItem(props: Props) {
	const { title, value, sx } = props;
	return (
		<Grid
			container
			display={"flex"}
			justifyContent={'space-between'}
			alignItems={'center'}
			sx={sx}
			paddingBottom={6}
		>
			<Typography
				variant="bodyMd"
				fontWeight={'medium'}
			>
				{title}
			</Typography>
			<Typography variant="bodyMd">{value}</Typography>
		</Grid>
	);
}
