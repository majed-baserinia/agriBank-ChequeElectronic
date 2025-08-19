import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// import Menu from 'ui/components/Menu';

import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import useTransferChequeInitiate from 'business/hooks/cheque/transferCheck/useTransferChequeInitiate';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';
import CheckReceivers from 'ui/components/CheckReceivers';
import { Loader, useLoadingHandler } from "@agribank/ui/components/Loader";
// import { menuList } from 'ui/pages/HomePage/menuList';
import { paths } from 'ui/route-config/paths';

export default function AddNewReceivers() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const { addNewCartableData, basicCheckData, selectedCheck, receivers } = useCartableChecklistData((store) => store);
	const { isLoading, mutate: transferChequeInitiat } = useTransferChequeInitiate();

	const handleSubmit = () => {
		if (basicCheckData && receivers && selectedCheck) {
			transferChequeInitiat(
				{
					description: basicCheckData.description,
					toIban: basicCheckData.toIban,
					reason: basicCheckData.reason.value,
					receivers: receivers,
					customerNumber: 0,
					sayadNo: selectedCheck?.dataFromList?.sayadNo ?? ""
				},
				{
					onError: (err) => {
						pushAlert({ type: 'error', hasConfirmAction: true, messageText: err.detail });
					},
					onSuccess: (res) => {
						addNewCartableData({ otpTransferRequirments: res });
						navigate(paths.cartable.OtpTransferConfirmation);
					}
				}
			);
		} else {
			pushAlert({
				type: 'error',
				hasConfirmAction: true,
				messageText: t('failedToGetDateFromStoreText'),
				actions: { onConfirm: () => navigate(paths.Home), onCloseModal: () => navigate(paths.Home) }
			});
		}
	};
	useLoadingHandler(isLoading);

	return (
		<Grid
			// container
			// sx={{ padding: matches ? '0' : '64px 0' }}
			display={'flex'}
			minHeight={"100%"}
			justifyContent={'center'}
			gap={'24px'}
			dir={theme.direction}
		>

			<BoxAdapter fullWidth={matches}>
				<Grid
					// minHeight={matches ? 'calc(100vh - 64px)' : 'calc(100vh - 192px)'}
					// container
					display={"flex"}
					minHeight={"100%"}
					direction={'column'}
					justifyContent={'space-between'}
					wrap="nowrap"
				>
					<Grid
						container
						direction={'column'}
						gap={'16px'}
					>
						{/* {!matches ? (
							// TODO: check if selected compony or homself acocunt and add one more step if it is compony
							<Stepper
								list={[
									t('checkInfo'),
									t('recivers'),
									t('verificationCode'),
									t('selectSignatureGroup'),
									t('end')
								]}
								active={1}
							/>
						) : null} */}
						<Typography variant="bodyMd">{t('addNewReceiversText')}</Typography>
						<CheckReceivers
							sayad={selectedCheck!.dataFromList!.sayadNo}
							onRceiversChange={(receiversList) =>
								addNewCartableData({
									receivers: receiversList
								})
							}
							receivers={receivers}
						/>
					</Grid>
					<Grid container>
						<ButtonAdapter
							variant="contained"
							size="medium"
							muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
							forwardIcon
							onClick={() => handleSubmit()}
						>
							{t('continue')}
						</ButtonAdapter>
					</Grid>
				</Grid>
			</BoxAdapter>


			{/* {matches ? null : (
				<Grid
					item
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<Menu
							divider={false}
							list={menuList.management}
						/>
						<Menu
							divider={false}
							list={menuList.services}
						/>
					</BoxAdapter>
				</Grid>
			)} */}
			{/* <Loader showLoader={isLoading} /> */}
		</Grid>
	);
}
