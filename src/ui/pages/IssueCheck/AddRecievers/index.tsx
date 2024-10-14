import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';

import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import useIssueChequeInitiate from 'business/hooks/cheque/Digital Cheque/useIssueChequeInitiate';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useIssueCheckWizardData } from 'business/stores/issueCheck/useIssueCheckWizardData';
import { IssueChequeInitiateRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { useEffect } from 'react';
import CheckReceivers from 'ui/components/CheckReceivers';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';
import { menuList } from '../../HomePage/menuList';

export default function AddReceivers() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { setNewDataToWizard, checkInfoPage, selectCheckPage, addReceiverPage } = useIssueCheckWizardData(
		(store) => store
	);
	const { isLoading, mutate: issueChequeInitiate } = useIssueChequeInitiate();

	useEffect(() => {
		if (!selectCheckPage) {
			pushAlert({
				type: 'error',
				hasConfirmAction: true,
				messageText: t('failedToGetDateFromStoreText'),
				actions: { onConfirm: () => navigate(paths.IssueCheck.SelectAccountPath) }
			});
		}

		if (!checkInfoPage) {
			pushAlert({
				type: 'error',
				hasConfirmAction: true,
				messageText: t('failedToGetDateFromStoreText'),
				actions: { onConfirm: () => navigate(paths.IssueCheck.CheckInfoPath) }
			});
		}
	}, []);

	const handleSubmitToNextLevel = () => {
		// Check if all necessary steps and data exist
		if (!selectCheckPage || !checkInfoPage) {
			return null;
		}
		if (addReceiverPage) {
			const preparedData: IssueChequeInitiateRequest = {
				sayadNo: selectCheckPage.checkData.sayadNo,
				amount: Number(checkInfoPage.checkAmount),
				dueDate: checkInfoPage.date.toString(),
				description: checkInfoPage.description,
				reason: checkInfoPage.reason.value,
				recievers: addReceiverPage.receivers!
			};

			issueChequeInitiate(preparedData, {
				onError: (err) => {
					//TODO: navigate the user if need to
					pushAlert({
						type: 'error',
						hasConfirmAction: true,
						messageText: err.detail
					});
				},
				onSuccess: (res) => {
					//save the data
					setNewDataToWizard({
						addReceiverPage: {
							...addReceiverPage,
							signitureRequirementData: {
								issueChequeKey: res.issueChequeKey,
								isSingleSignatureLegal: res.isSingleSignatureLegal
							}
						}
					});

					//check the res and navigate based on it
					if (res.isNeedOtp) {
						navigate(paths.IssueCheck.OtpCheckPath);
					} else {
						navigate(paths.IssueCheck.SignatureRegistrationPath);
					}
				}
			});
		}
	};

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
							{!matches ? (
								// TODO: check if selected compony or homself acocunt and add one more step if it is compony
								<Stepper
									list={[
										t('selectCheck'),
										t('checkInfo'),
										t('recivers'),
										t('issueSignature'),
										t('end')
									]}
									active={2}
								/>
							) : null}
							<Typography variant="bodyMd">{t('addReceiversText')}</Typography>
							{selectCheckPage ? (
								<CheckReceivers
									sayad={selectCheckPage.checkData.sayadNo}
									onRceiversChange={(receiversList) =>
										setNewDataToWizard({
											addReceiverPage: { ...addReceiverPage, receivers: receiversList }
										})
									}
									receivers={addReceiverPage?.receivers}
								/>
							) : null}
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
								forwardIcon
								onClick={() => handleSubmitToNextLevel()}
							>
								{t('continue')}
							</ButtonAdapter>
						</Grid>
					</Grid>
					<Loader showLoader={isLoading} />
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
		</Grid>
	);
}
