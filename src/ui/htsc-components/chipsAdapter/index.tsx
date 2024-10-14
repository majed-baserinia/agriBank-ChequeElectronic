import { Chip, Grid, Typography, useTheme } from '@mui/material';

import CounterIcon from './CounterIcon';
import { Props } from './type';

export default function ChipsAdapter(props: Props) {
	const { label, size = 'medium', onClick, icon = false, color = 'default', count, variant } = props;
	const theme = useTheme();

	const sx = {
		backgroundColor: variant === 'filled' ? theme.palette.primary[50] : 'transparent',
		border: `1px solid ${theme.palette.grey[200]}`,
		'&&:hover': {
			backgroundColor: icon ? theme.palette.primary[50] : 'transparent',
			border: `1px solid ${icon ? theme.palette.primary.main : theme.palette.grey[200]}`
		},
		'.MuiChip-outlined': {
			'& :hover': {
				border: '1px solid red'
			}
		},
		'.MuiChip-icon': {
			margin: '0 5px'
		},
		'.MuiChip-label': {
			marginTop: '2px'
		},
		'& .MuiChip-deleteIcon': {
			margin: '0 5px'
		}
	};

	return (
		<Chip
			clickable
			color={color}
			dir={theme.direction === 'ltr' ? 'rtl' : 'ltr'}
			size={size}
			label={<Typography variant="bodySm">{label}</Typography>}
			variant="outlined"
			onClick={(e) => onClick?.(e)}
			onDelete={count ? () => {} : undefined}
			deleteIcon={count ? <CounterIcon count={count} /> : undefined}
			sx={sx}
			icon={icon ? <Grid>{icon}</Grid> : undefined}
		/>
	);
}
