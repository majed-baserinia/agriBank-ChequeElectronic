import { FormControlLabel, Radio, Typography, useTheme } from '@mui/material';
import { Props } from './types';

export default function RadioButtonAdapter(props: Props) {
	const { value, label, checked, onChange, disabled } = props;
	const theme = useTheme();

	return (
		<FormControlLabel
			sx={{
				padding: '8px',
				border: checked ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.grey[200]}`,
				borderRadius: '16px',
				marginRight: 'unset',
				marginLeft: 'unset',
				width: '100%'
			}}
			disabled={disabled}
			value={value}
			control={
				<Radio
					checked={checked}
					onChange={onChange}
				/>
			}
			label={
				<Typography
					variant="bodyMd"
					fontWeight={'medium'}
				>
					{label}
				</Typography>
			}
			labelPlacement="end"
		/>
	);
}
