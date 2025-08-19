import { Grid, Typography, useTheme } from '@mui/material';
import { formatAmount } from 'common/utils';
import { useTranslation } from 'react-i18next';
import ChipStatusAdapter from 'ui/htsc-components/ChipStatusAdapter';
import OverviewItem from '../CheckOverview/OverviewItem';
import { Props } from './types';

export default function NewCheckInfoBasics(props: Props) {
	const { checkData, hasTitle = false } = props;
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
			{hasTitle ? (
				<Typography
					marginBottom={12}
					variant='bodyMd'
					textAlign={'center'}
				>
					{t('checkDetail')}
				</Typography>
			) : null}
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
							variant="bodyMd"
							fontWeight={'medium'}
						>
							{t('checkStatus')}
						</Typography>
						<Grid>
							<ChipStatusAdapter
								size="small"
								type={'info'}
								label={checkStatus}
							/>
						</Grid>
					</Grid>
				) : null}
				<OverviewItem
					title={t('sayadNo')}
					value={sayad}
				/>
				<OverviewItem
					title={t('serieAndSerial')}
					value={`${serie}/${serial}`}
				/>
				<OverviewItem
					title={t('amountR')}
					value={formatAmount(amount)}
				/>
				<OverviewItem
					title={t('dueDate')}
					value={date}
				/>
				{sheba ? (
					<OverviewItem
						title={t('shebaOrigin')}
						value={sheba}
					/>
				) : null}
				{reason ? (
					<OverviewItem
						title={t('reason')}
						value={reason}
					/>
				) : null}
				{/* <Grid
					container
					direction={'column'}
					gap={'8px'}
					sx={{ marginBottom: '8px', marginTop: '8px' }}
				>
					<Typography
						variant="bodyMd"
						fontWeight={'medium'}
					>
						{t('description')}
					</Typography>
					<Typography variant="bodyMd">{description}</Typography>
				</Grid> */}
			</Grid>
		</Grid>
	);
}
