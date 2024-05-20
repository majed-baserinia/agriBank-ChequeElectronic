import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import useIssueChequeInitiate from 'business/hooks/cheque/Digital Cheque/useIssueChequeInitiate';
import { useDataSteps } from 'business/stores/issueCheck/dataSteps';
import CheckReceivers from 'ui/components/CheckReceivers';
import Loader from 'ui/htsc-components/loader/Loader';
import { menuList } from 'ui/pages/HomePage/menuList';

export default function AddNewReceivers() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { steps, setStepData } = useDataSteps((store) => store);
	const { isLoading, mutate: issueChequeInitiate } = useIssueChequeInitiate();

	// useEffect(() => {
	// 	if (!steps.selectdCheckSheet) {
	// 		pushAlert({
	// 			type: 'error',
	// 			hasConfirmAction: true,
	// 			messageText: t('failedToGetDateFromStoreText'),
	// 			actions: { onConfirm: () => navigate(paths.IssueCheck.SelectAccountPath) }
	// 		});
	// 	}

	// 	if (!steps.issueCheckDetail) {
	// 		pushAlert({
	// 			type: 'error',
	// 			hasConfirmAction: true,
	// 			messageText: t('failedToGetDateFromStoreText'),
	// 			actions: { onConfirm: () => navigate(paths.IssueCheck.CheckInfoPath) }
	// 		});
	// 	}
	// }, []);

	// const handleSubmitToNextLevel = () => {
	// 	const { selectdCheckSheet, issueCheckDetail, receivers } = steps;

	// 	// Check if all necessary steps and data exist
	// 	if (!selectdCheckSheet || !issueCheckDetail) {
	// 		return null;
	// 	}

	// 	const preparedData: IssueChequeInitiateRequest = {
	// 		sayadNo: selectdCheckSheet?.sayadNo,
	// 		amount: Number(issueCheckDetail?.checkAmount),
	// 		dueDate: issueCheckDetail?.date,
	// 		description: issueCheckDetail?.description,
	// 		reason: issueCheckDetail?.reason.value,
	// 		recievers: receivers
	// 	};

	// 	issueChequeInitiate(preparedData, {
	// 		onError: (err) => {
	// 			//TODO: navigate the user if need to
	// 			pushAlert({
	// 				type: 'error',
	// 				hasConfirmAction: true,
	// 				messageText: err.detail
	// 			});
	// 		},
	// 		onSuccess: (res) => {
	// 			//save the data
	// 			setStepData({
	// 				signitureRequirementData: {
	// 					issueChequeKey: res.issueChequeKey,
	// 					isSingleSignatureLegal: res.isSingleSignatureLegal
	// 				}
	// 			});

	// 			//check the res and navigate based on it
	// 			if (res.isNeedOtp) {
	// 				navigate(paths.IssueCheck.OtpCheckPath);
	// 			} else {
	// 				navigate(paths.IssueCheck.SignatureRegistrationPath);
	// 			}
	// 		}
	// 	});
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
				<BoxAdapter fullWidth={matches}>
					<Grid
						minHeight={matches ? 'calc(100vh - 64px)' : 'calc(100vh - 192px)'}
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
							<Title>{t('activationElCheck')}</Title>
							{!matches ? (
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
							) : null}
							<Typography variant="bodyMd">{t('addNewReceiversText')}</Typography>
							<CheckReceivers
								getRceivers={(receiversList) => setStepData({ receivers: receiversList })}
							/>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
								forwardIcon
								onClick={() => console.log()}
							>
								{t('continue')}
							</ButtonAdapter>
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
						/>
					</BoxAdapter>
				</Grid>
			)}
			<Loader showLoader={isLoading} />
		</Grid>
	);
}
