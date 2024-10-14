import { Grid, Typography } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import TablerMoneybag from 'assets/icon/menu/TablerMoneybag.svg';
import giveBackCheckIcon from 'assets/icon/menu/giveBackCheckIcon.svg';
import rejectGiveBack from 'assets/icon/menu/rejectGiveBack.svg';
import transferCheck from 'assets/icon/menu/transfer-check.svg';
import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';
import { Check } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BottomSheetAdapter from 'ui/htsc-components/BottomSheetAdapter/BottomSheetAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { paths } from 'ui/route-config/paths';
import Menu from '../../Menu';

export default function BottomSheetActionButton({ checkData }: { checkData: Check }) {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const { addNewCartableData, selectedCheck } = useCartableChecklistData((store) => store);

	return (
		<>
			<ButtonAdapter
				variant="contained"
				onClick={() => {
					setOpen(!open);
					addNewCartableData({ selectedCheck: { ...selectedCheck, dataFromList: checkData } });
				}}
				muiButtonProps={{
					sx: {
						width: '100%'
					}
				}}
			>
				{t('selectAction')}
			</ButtonAdapter>
			<BottomSheetAdapter
				open={open}
				setOpen={setOpen}
				snapPoints={[450, 0]}
			>
				<Grid
					sx={{ padding: '16px' }}
					container
					justifyContent={'center'}
					direction={'column'}
					gap={'18px'}
				>
					<Grid
						container
						alignItems={'center'}
						gap={'8px'}
					>
						<SvgToIcon
							icon={infoIcon}
							alt="info"
						/>
						<Typography
							variant="bodyLg"
							fontWeight={'bold'}
						>
							{t('selectAction')}
						</Typography>
					</Grid>
					<Typography variant="bodySm">{t('selectActionText')}</Typography>
					<Menu list={checkActionsMenuList} />
				</Grid>
			</BottomSheetAdapter>
		</>
	);
}

export const checkActionsMenuList = [
	{
		id: '1',
		title: 'transferCheck',
		icon: (
			<SvgToIcon
				icon={transferCheck}
				alt="transferCheck"
			/>
		),
		routeTo: paths.cartable.Transfer
	},
	{
		id: '2',
		title: 'CashingCheck',
		icon: (
			<SvgToIcon
				icon={TablerMoneybag}
				alt="CashingCheck"
			/>
		),
		routeTo: paths.cartable.Cashing
	},
	// {
	// 	id: '3',
	// 	title: 'Conf/rej',
	// 	icon: (
	// 		<SvgToIcon
	// 			icon={acceptOrNotIcon}
	// 			alt="list check"
	// 		/>
	// 	),
	// 	routeTo:   paths.cartable.TransferCheck
	// },
	{
		id: '3',
		title: 'giveBackCheck',
		icon: (
			<SvgToIcon
				icon={giveBackCheckIcon}
				alt="list check"
			/>
		),
		routeTo: paths.cartable.GiveBackCheckInitiate
	},
	// {
	// 	id: '3',
	// 	title: 'rejectTransferCheck',
	// 	icon: (
	// 		<SvgToIcon
	// 			icon={rejectTransfer}
	// 			alt="list check"
	// 		/>
	// 	),
	// 	routeTo:   paths.cartable.Transfer
	// },
	{
		id: '3',
		title: 'rejectGiveBack',
		icon: (
			<SvgToIcon
				icon={rejectGiveBack}
				alt="list check"
			/>
		),
		routeTo: paths.cartable.RejectGiveBackCheckInitiate
	}
];
