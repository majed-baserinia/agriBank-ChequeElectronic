import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';

import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import useDetectFinalizeTransfer from 'business/hooks/cheque/transferCheck/useDetectFinalizeTransfer';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';
import PersonsList from 'ui/components/CheckOverview/PersonsList';
import NewCheckInfoBasics from 'ui/components/NewCheckInfoBasics';
import Loader from 'ui/htsc-components/loader/Loader';
import { menuList } from 'ui/pages/HomePage/menuList';
import { paths } from 'ui/route-config/paths';

export default function TransferOverView() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { transferOverview, selectedCheck, otpTransferRequirments, reset } = useCartableChecklistData((store) => store);

	const { isLoading, mutate: finalSubmit } = useDetectFinalizeTransfer()();

	const handleSubmit = () => {
		if (otpTransferRequirments?.transferChequeKey) {
			finalSubmit(
				{
					transferChequeKey: otpTransferRequirments?.transferChequeKey
				},
				{
					onError: (err) => {
						pushAlert({ type: 'error', hasConfirmAction: true, messageText: err.detail });
					},
					onSuccess(res) {
						pushAlert({
							type: 'success',
							hasConfirmAction: true,
							messageText: res.message,
							actions: {
								onCloseModal: () => navigate(paths.Home),
								onConfirm: () => navigate(paths.Home)
							}
						});
					}
				}
			);
		}
	};

	const handleCancel = () => {
		reset();
		navigate(paths.Home);
	};

	// const overviewData: issueChequeOverView = {
	// 	amount: 212,
	// 	description: 'advdsvds',
	// 	dueDate: '222222',
	// 	reason: 'dsv dsvds',
	// 	recievers: [
	// 		{
	// 			customerType: 4,
	// 			name: 'name',
	// 			nationalNo: '321123123',
	// 			shahabNo: '',
	// 			customerTypeDescription: 'نامشخص'
	// 		},
	// 		{
	// 			customerType: 3,
	// 			name: 'name',
	// 			nationalNo: '321123123',
	// 			shahabNo: '4142',
	// 			customerTypeDescription: 'نامشخص'
	// 		},
	// 		{
	// 			customerType: 2,
	// 			name: 'name',
	// 			nationalNo: '321123123',
	// 			shahabNo: '4142',
	// 			customerTypeDescription: 'نامشخص'
	// 		},
	// 		{
	// 			customerType: 1,
	// 			name: 'name',
	// 			nationalNo: '321123123',
	// 			shahabNo: '4142',
	// 			customerTypeDescription: 'نامشخص'
	// 		}
	// 	],
	// 	sayadNo: 3232413.2,
	// 	seri: '21321',
	// 	serial: '324324',
	// 	signers: [
	// 		{
	// 			withdrawalGroups: [
	// 				{
	// 					customerNumber: 3241534135,
	// 					name: 'name'
	// 				},
	// 				{
	// 					customerNumber: 3241534135,
	// 					name: 'name'
	// 				},
	// 				{
	// 					customerNumber: 3241534135,
	// 					name: 'name'
	// 				},
	// 				{
	// 					customerNumber: 3241534135,
	// 					name: 'name'
	// 				}
	// 			],
	// 			groupNumber: 'grupnumber'
	// 		}
	// 	],
	// 	toIBAN: '463543'
	// };

	return (
		<Grid
			container
			sx={{ padding: matches ? '0' : '64px 0' }}
			justifyContent={'center'}
			gap={'24px'}
			dir={theme.direction}
		>
			<Grid
				item
				xs={12}
				md={8}
			>
				<BoxAdapter
					fullWidth={matches}
					muiPaperProps={{
						sx: {
							minWidth: '25%',
							borderRadius: matches ? 0 : '32px',
							padding: '16px'
						}
					}}
				>
					<Grid
						minHeight={matches ? 'calc(100vh - 32px)' : 'calc(100vh - 192px)'}
						container
						direction={'column'}
						justifyContent={'space-between'}
						wrap="nowrap"
					>
						<Grid
							container
							direction={'column'}
							gap={'16px'}
						>
							{!matches ? (
								<Stepper
									list={[
										t('checkInfo'),
										t('recivers'),
										t('verificationCode'),
										t('selectSignatureGroup'),
										t('end')
									]}
									active={4}
								/>
							) : null}

							{transferOverview && selectedCheck ? (
								<NewCheckInfoBasics
									hasTitle
									checkData={{
										amount: selectedCheck.dataFromList?.amount.toString()!,
										description: transferOverview.transferChequeOverView?.description!,
										date: selectedCheck.dataFromList?.dueDate!,
										sayad: transferOverview.transferChequeOverView?.sayadNo.toString(),
										reason: transferOverview?.transferChequeOverView?.reasonDescription,
										serie: selectedCheck.dataFromList?.seriesNo!,
										serial: selectedCheck.dataFromList?.serialNo!,
										checkStatus: selectedCheck.dataFromList?.chequeStatusDescription!,
										sheba: selectedCheck.dataFromList?.fromIban!
									}}
								/>
							) : null}
							<PersonsList
								recievers={transferOverview?.transferChequeOverView?.recievers}
								signers={transferOverview?.transferChequeOverView?.signers}
							/>
						</Grid>

						<Grid
							container
							justifyContent={'space-between'}
							gap={'16px'}
						>
							<Grid sx={{ width: '48%' }}>
								<ButtonAdapter
									variant="contained"
									size="medium"
									muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
									onClick={() => handleSubmit()}
								>
									{t('registerAndConfirm')}
								</ButtonAdapter>
							</Grid>
							<Grid sx={{ width: '48%' }}>
								<ButtonAdapter
									variant="outlined"
									size="medium"
									muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
									onClick={() => handleCancel()}
								>
									{t('cancel')}
								</ButtonAdapter>
							</Grid>
						</Grid>
					</Grid>
				</BoxAdapter>
			</Grid>
			{matches ? null : (
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
						/>{' '}
					</BoxAdapter>
				</Grid>
			)}
			<Loader showLoader={isLoading} />
		</Grid>
	);
}
