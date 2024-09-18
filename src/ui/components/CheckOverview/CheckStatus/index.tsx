import { Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import OverviewItem from '../OverviewItem';
import { Props } from './types';
import ChipStatusAdapter from 'ui/htsc-components/ChipStatusAdapter';

export default function CheckStatus(props: Props) {
	const { checkStatus, checkGuaranteeStatus, checkBlockingStatus } = props;
	const { t } = useTranslation();
	const theme = useTheme();

	return (
		<Grid
			container
			item
			justifyContent={'space-between'}
			alignItems={'center'}
			sx={{
				border: `1px solid ${theme.palette.grey[50]}`,
				borderRadius: '16px',
				padding: '16px'
			}}
			gap={'16px'}
		>
			<Typography
				variant="bodySm"
				fontWeight={'medium'}
			>
				{t('checkStatus')}
			</Typography>
			<Grid>
				{checkStatus ? (
					<ChipStatusAdapter
						size="small"
						type={'info'}
						label={checkStatus}
					/>
				) : null}
			</Grid>
			<OverviewItem
				title={t('checkGuaranteeStatus')}
				value={checkGuaranteeStatus}
			/>
			<OverviewItem
				title={t('checkBlocking')}
				value={checkBlockingStatus}
			/>
		</Grid>
	);
}
