import { Paper } from '@mui/material';

import { Props } from './type';

export default function BoxAdapter(props: Props) {
	const { children, fullWidth, muiPaperProps } = props;

	return (
		<Paper
			elevation={0}
			sx={{
				minWidth: '25%',
				borderRadius: fullWidth ? 0 : '32px',
				padding: '32px'
			}}
			{...muiPaperProps}
		>
			{children}
		</Paper>
	);
}
