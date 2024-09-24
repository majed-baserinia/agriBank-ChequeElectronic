import { Grid, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import OverviewItem from '../CheckOverview/OverviewItem';

type Props = {
	checkData: {
		lockStatus: string;
		sharedStatus?: string;
		settlementDate?: string;
		dueDate: string;
		checkType: string;
		branchCode: string;
		bankCode: string;
	};
};
export default function NewCheckInfoAdvance(props: Props) {
	const { checkData } = props;
	const { lockStatus, sharedStatus, settlementDate, dueDate, checkType, branchCode, bankCode } = checkData;
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Grid sx={{ padding: '16px', border: `1px solid ${theme.palette.grey[50]}` }}>
			<Grid
				container
				direction={'column'}
				gap={'16px'}
				sx={{ margin: '0 8px' }}
			>
				<OverviewItem
					title={t('lockStatus')}
					value={lockStatus}
				/>
				{sharedStatus ? (
					<OverviewItem
						title={t('sharedStatus')}
						value={sharedStatus}
					/>
				) : null}
				{settlementDate ? (
					<OverviewItem
						title={t('settlementDate')}
						value={settlementDate}
					/>
				) : null}
				<OverviewItem
					title={t('dueDate')}
					value={dueDate}
				/>
				<OverviewItem
					title={t('checkType')}
					value={checkType}
				/>
				<OverviewItem
					title={t('branchCode')}
					value={branchCode}
				/>
				<OverviewItem
					title={t('bankCode')}
					value={bankCode}
				/>
			</Grid>
		</Grid>
	);
}
