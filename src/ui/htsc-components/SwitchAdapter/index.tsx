import { FormLabel, Grid, Typography } from '@mui/material';
import { LargeSwitch } from './LargeSwitch';
import { SmallSwitch } from './SmallSwitch';
import { Props } from './type';

export default function SwitchAdapter(props: Props) {
	const { type = 'large', checked, onChange, label, spaceBetween, switchProps } = props;

	return (
		<Grid
			container
			alignItems={'center'}
			justifyContent={spaceBetween ? 'space-between' : 'initial'}
			gap={'8px'}
		>
			<FormLabel>
				<Typography variant="bodySm">{label}</Typography>
			</FormLabel>
			{type === 'large' ? (
				<LargeSwitch
					checked={checked}
					onChange={onChange}
					{...switchProps}
				/>
			) : (
				<SmallSwitch
					checked={checked}
					onChange={onChange}
					value={checked}
					{...switchProps}
				/>
			)}
		</Grid>
	);
}
