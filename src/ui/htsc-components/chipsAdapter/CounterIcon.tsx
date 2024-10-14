import { useTheme } from '@mui/material';

export default function CounterIcon({ count }: { count: number }) {
	const theme = useTheme();

	return (
		<div
			style={{
				width: '18px',
				height: '18px',
				borderRadius: '50px',
				backgroundColor: theme.palette.primary.main,
				textAlign: 'center',
				paddingBottom: '5px',
				fontSize: '14px',
				color: theme.palette.primary[700],
				margin: '4px'
			}}
		>
			{count}
		</div>
	);
}
