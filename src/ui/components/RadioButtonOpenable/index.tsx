import { FormControlLabel, Grid, Radio, Typography, useTheme } from '@mui/material';
import editIcon from 'assets/icon/edit.svg';
import userIcon from 'assets/icon/user.svg';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import SwitchAdapter from 'ui/htsc-components/SwitchAdapter';

type Props = {
	value: string | number;
	checked: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	groupParts: string[];
	label: string;
	onEditClick: () => void;
};

export default function RadioButtonOpenable(props: Props) {
	const { value, checked, onChange, groupParts, label, onEditClick } = props;
	const theme = useTheme();
	const { t, i18n } = useTranslation();
	const [isOrder, setIsOrder] = useState(false);

	const mapNumbers: { [key: number]: string } = {
		0: t('first'),
		1: t('second'),
		2: t('third'),
		3: t('fourth'),
		4: t('fifth'),
		5: t('sixth'),
		6: t('seventh'),
		7: t('eighth'),
		8: t('ninth'),
		9: t('tenth'),
		10: t('eleventh'),
		11: t('twelfth'),
		12: t('thirteenth'),
		13: t('fourteenth'),
		14: t('fifteenth'),
		15: t('sixteenth'),
		16: t('seventeenth'),
		17: t('eighteenth'),
		18: t('nineteenth'),
		19: t('twentieth')
		// Add more entries if needed
	};

	return (
		<Grid
			sx={{
				height: checked ? 'unset' : '60px',
				width: '100%',
				overflow: 'hidden',
				padding: '8px',
				border: checked ? `1px solid ${theme.palette.primary.main}` : `unset`,
				borderRadius: '16px',
				marginRight: 'unset',
				marginLeft: 'unset',
				transition: 'height 3s ease'
			}}
		>
			<FormControlLabel
				disabled={false}
				value={value}
				control={
					<Grid
						container
						alignItems={'center'}
					>
						<Radio
							checked={checked}
							onChange={(e) => onChange(e)}
							value={value}
						/>
						<Grid sx={{ margin: '16px 0', color: checked ? theme.palette.primary.main : 'unset' }}>
							<Typography
								variant="bodySm"
								fontWeight={checked ? 'bold' : undefined}
							>
								{label}
							</Typography>
						</Grid>
					</Grid>
				}
				label={''}
				labelPlacement="end"
			/>
			<Grid
				container
				direction={'column'}
				flexWrap={'nowrap'}
				sx={{ overflow: 'hidden', height: '100%' }}
			>
				<Grid
					container
					direction={'column'}
					gap={'4px'}
				>
					{groupParts.map((part, index) => {
						return (
							<Grid
								key={part}
								direction={i18n.dir() === 'rtl' ? 'row' : 'row-reverse'}
								sx={{ marginBottom: '4px' }}
								container
								alignItems={'center'}
								gap={'3px'}
							>
								<SvgToIcon
									icon={userIcon}
									alt="user icon"
								/>
								<Typography variant="bodyXs">{t('signatory')} </Typography>
								<Typography variant="bodyXs">{mapNumbers[index]} </Typography>{' '}
								<Typography variant="bodyXs">{part} </Typography>
							</Grid>
						);
					})}
				</Grid>
				<Grid
					container
					justifyContent={'space-between'}
					alignItems={'center'}
				>
					<ButtonAdapter
						disabled={!isOrder}
						endIcon={
							<SvgToIcon
								icon={editIcon}
								alt="edit"
							/>
						}
						onClick={() => onEditClick()}
					>
						{t('edit')}
					</ButtonAdapter>
					<SwitchAdapter
						type="small"
						label={t('noSignatureArrangement')}
						checked={isOrder}
						onChange={(_, checked) => {
							setIsOrder(checked);
						}}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
}
