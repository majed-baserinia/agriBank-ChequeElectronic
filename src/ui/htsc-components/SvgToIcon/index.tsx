import { Grid } from '@mui/material';

type props = {
	icon: string;
	alt?: string;
	width?: string;
	height?: string;
};

export default function SvgToIcon({ icon, alt = '', height = '24px', width = '24px' }: props) {
	return (
		<Grid sx={{ width: width, height: height, flexShrink: 0 }}>
			<img
				style={{ width: '100%', height: '100%', objectFit: 'contain' }}
				src={icon}
				alt={alt}
			/>
		</Grid>
	);
}
