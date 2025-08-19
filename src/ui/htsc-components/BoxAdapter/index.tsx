import { Paper } from '@mui/material';

import { Props } from './type';

export default function BoxAdapter(props: Props) {
	const { children, fullWidth, muiPaperProps } = props;

	return (
		<Paper
			component="div"
			elevation={0}
			{...muiPaperProps}
			sx={{
				display: "flex",
				flexDirection: "column",
				minWidth: '100%',
				// borderRadius: fullWidth ? 0 : '32px',
				padding: '20px',
				height: "100%"
			}}
		>
			{children}
		</Paper>
	);
}
