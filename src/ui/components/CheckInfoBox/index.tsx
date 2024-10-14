import { Divider, Grid, Typography, useTheme } from '@mui/material';
import { Check } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { useTranslation } from 'react-i18next';
import OverviewItem from '../CheckOverview/OverviewItem';

type Props = {
	check: Check;
};
export default function CheckInfoBox(props: Props) {
	const { seriesNo, sayadNo, amount, chequeStatusDescription, dueDate, serialNo, description, reasonDescription } =
		props.check;
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Grid
			sx={{
				backgroundColor: theme.palette.primary[50],
				padding: '16px',
				borderRadius: '16px'
			}}
		>
			<Typography
				variant="bodyMd"
				fontWeight={'medium'}
				align="center"
			>
				{t('checkInfo')}
			</Typography>
			<Grid
				container
				direction={'column'}
				gap={'8px'}
				sx={{ marginBottom: '8px', marginTop: '8px' }}
			>
				<OverviewItem
					title={t('sayadNo')}
					value={sayadNo}
				/>
				<OverviewItem
					title={t('series')}
					value={seriesNo}
				/>
				<OverviewItem
					title={t('serial')}
					value={serialNo}
				/>
			</Grid>
			<Divider />
			<Grid
				container
				direction={'column'}
				gap={'8px'}
				sx={{ marginBottom: '8px', marginTop: '8px' }}
			>
				<OverviewItem
					title={t('amount')}
					value={amount}
				/>
				<OverviewItem
					title={t('checkStatus')}
					value={chequeStatusDescription}
				/>
				<OverviewItem
					title={t('dueDate')}
					value={dueDate}
				/>
				<OverviewItem
					title={t('reason')}
					value={reasonDescription}
				/>
			</Grid>
			<Divider />
			<Grid
				container
				direction={'column'}
				gap={'8px'}
				sx={{ marginBottom: '8px', marginTop: '8px' }}
			>
				<Typography
					variant="bodySm"
					fontWeight={'medium'}
				>
					{t('description')}
				</Typography>
				<Typography variant="bodySm">{description}</Typography>
			</Grid>
		</Grid>
	);
}
