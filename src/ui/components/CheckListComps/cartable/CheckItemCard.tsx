import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';
import { Check } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { formatAmount } from 'common/utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import ChipStatusAdapter from 'ui/htsc-components/ChipStatusAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';
import OverviewItem from '../../CheckOverview/OverviewItem';
import BottomSheetActionButton from './BottomSheetActionButton';

export default function CheckItemCard({ check }: { check: Check }) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
	const { addNewCartableData, selectedCheck } = useCartableChecklistData();

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
				//TODO: fix the width on mediaquery
				maxWidth: matchesSmall ? 'unset' : '285px'
			}}
			gap={'16px'}
			wrap="nowrap"
		>
			<Loader showLoader={!check} />
			<Grid
				container
				item
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Grid>{check?.sayadNo}</Grid>
				<Grid>
					<Grid sx={{ width: '100px' }}>
						<ChipStatusAdapter
							size="small"
							type={'info'}
							label={check.chequeStatusDescription}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid
				container
				item
				justifyContent={'space-between'}
			>
				<OverviewItem
					title={t('serieAndSerial')}
					value={check?.seriesNo + '/' + check?.serialNo}
				/>
				<OverviewItem
					title={t('amount')}
					value={formatAmount(check?.amount.toString())}
				/>
				<OverviewItem
					title={t('reason')}
					value={check?.reasonDescription}
				/>
				<OverviewItem
					title={t('date')}
					value={check?.dueDate}
				/>
			</Grid>
			<Grid
				container
				item
				gap={'16px'}
				wrap="nowrap"
			>
				<BottomSheetActionButton checkData={check} />
				<ButtonAdapter
					muiButtonProps={{
						sx: {
							width: '100%'
						}
					}}
					variant="outlined"
					forwardIcon
					onClick={() => {
						addNewCartableData({ selectedCheck: { ...selectedCheck, dataFromList: check } });
						navigate(  paths.cartable.Details);
					}}
				>
					{t('details')}
				</ButtonAdapter>
			</Grid>
		</Grid>
	);
}
