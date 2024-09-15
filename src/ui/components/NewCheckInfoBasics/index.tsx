import { Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ChipsStatusGenerator from '../CheckListComps/ChipsStatusGenerator';
import OverviewItem from '../CheckOverview/OverviewItem';
import { Props } from './types';

export default function NewCheckInfoBasics(props: Props) {
	const { checkData } = props;
	const { amount, description, reason, sayad, serial, serie, sheba, date, checkStatus } = checkData;
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
			<Grid
				container
				direction={'column'}
				gap={'8px'}
				sx={{ marginBottom: '8px', marginTop: '8px' }}
			>
				{checkStatus ? (
					<Grid
						container
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Typography
							variant="bodySm"
							fontWeight={'medium'}
						>
							{t('checkStatus')}
						</Typography>
						<Grid>
							<ChipsStatusGenerator status={checkStatus} />{' '}
						</Grid>
					</Grid>
				) : null}
				<OverviewItem
					title={t('sayadNo')}
					value={sayad}
				/>
				<OverviewItem
					title={t('amount')}
					value={amount}
				/>
				<OverviewItem
					title={t('dueDate')}
					value={date}
				/>
				<OverviewItem
					title={t('serieAndSerial')}
					value={`${serie}/${serial}`}
				/>
				{sheba ? (
					<OverviewItem
						title={t('shebaOrigin')}
						value={sheba}
					/>
				) : null}
				<OverviewItem
					title={t('reason')}
					value={reason}
				/>
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
		</Grid>
	);
}
