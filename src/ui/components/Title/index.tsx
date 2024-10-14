import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';

export default function Title(props: { children: ReactNode }) {
	const { children } = props;
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Typography
			dir={theme.direction}
			variant="bodyLg"
			fontWeight={matches ? 'medium' : 'bold '}
			sx={{ marginBottom: '24px' }}
		>
			{children}
		</Typography>
	);
}
