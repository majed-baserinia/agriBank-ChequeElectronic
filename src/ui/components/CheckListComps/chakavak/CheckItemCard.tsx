import { Grid, useTheme } from '@mui/material';
import { useHandedOversData } from 'business/stores/handedOverChecks/useHandedOversStore';
import { chakavakCheck } from 'common/entities/cheque/chekList/ChakavakGetEChequeList/ChakavakGetEChequeListResponse';
import { formatAmount } from 'common/utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import OverviewItem from 'ui/components/CheckOverview/OverviewItem';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import ChipStatusAdapter from 'ui/htsc-components/ChipStatusAdapter';
import { paths } from 'ui/route-config/paths';

export default function CheckItemCard({ check }: { check: chakavakCheck }) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const { addNewStoreData } = useHandedOversData();

	return (
		<Grid
			container
			justifyContent={'center'}
			alignItems={'center'}
			direction={'column'}
			sx={{
				padding: '16px',
				border: `1px solid ${theme.palette.grey[50]}`,
				borderRadius: '16px',
				flex: 1,
				minWidth: 300
			}}
			gap={'16px'}
			wrap="nowrap"
		>
			<Grid
				container
				item
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Grid></Grid>
				<Grid>
					<Grid sx={{ width: '100px' }}>
						<ChipStatusAdapter
							size="small"
							type={'info'}
							label={check.chqStatusDesc}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid
				container
				item
				justifyContent={'space-between'}
				gap={8}
			>
				<OverviewItem
					title={t('serial')}
					value={check?.serial}
				/>
				<OverviewItem
					title={t('amount')}
					value={formatAmount(check?.amount.toString())}
				/>

				<OverviewItem
					title={t('date')}
					value={check?.chequeDate}
				/>
			</Grid>
			<Grid container>
				<ButtonAdapter
					muiButtonProps={{
						sx: {
							width: '100%'
						}
					}}
					variant="contained"
					forwardIcon
					onClick={() => {
						addNewStoreData({ detailsPage: { check: check } });
						navigate(paths.HandedOvers.HandedOverDetails);
					}}
				>
					{t('details')}
				</ButtonAdapter>
			</Grid>
		</Grid>
	);
}
