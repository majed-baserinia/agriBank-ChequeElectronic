import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';

import infoIcon from 'assets/icon/info-circle.svg';
import sendAaginIcon from 'assets/icon/refresh-alert.svg';
import useIssueChequeInitiateSignature from 'business/hooks/cheque/Digital Cheque/useIssueChequeInitiateSignature';
import useIssueChequeVerifyInitiate from 'business/hooks/cheque/Digital Cheque/useIssueChequeVerifyInitiate';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useIssueCheckWizardData } from 'business/stores/issueCheck/useIssueCheckWizardData';
import { Loader, useLoadingHandler } from "@agribank/ui/components/Loader";
import { paths } from 'ui/route-config/paths';

export default function SignatureRegistration() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { addReceiverPage, setNewDataToWizard } = useIssueCheckWizardData((store) => store);
	const store = useIssueCheckWizardData((store) => store)
	// console.log(store)

	const { mutate: issueChequeInitiateSignature, isLoading: initiateLoading } = useIssueChequeInitiateSignature();
	const { mutate: issueChequeVerifyInitiate, isLoading } = useIssueChequeVerifyInitiate();

	useEffect(() => {
		handleIssueChequeInitiateSignature();
	}, []);

	const handleIssueChequeInitiateSignature = () => {
		if (addReceiverPage?.signitureRequirementData) {
			issueChequeInitiateSignature(
				{ issueChequeKey: addReceiverPage.signitureRequirementData.issueChequeKey! },
				{
					onError: (err) => {
						pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
					},
					onSuccess: (res) => {
						pushAlert({ type: 'info', messageText: res.message, hasConfirmAction: true });
					}
				}
			);
		}
	};

	const handleSubmitToNextLevel = () => {
		if (addReceiverPage?.signitureRequirementData) {
			const requestData = {
				issueChequeKey: addReceiverPage.signitureRequirementData.issueChequeKey!,
				otpCode: '',
				signSingleSignatureLegal: true
			};
			issueChequeVerifyInitiate(requestData, {
				onError: (err) => {
					pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
				},
				onSuccess: (res) => {
					setNewDataToWizard({
						otpPage: {
							issueChequeOverView: res.issueChequeOverView
						}
					});
					navigate(paths.IssueCheck.OverViewPath, { replace: true });
				}
			});
		}
	};

	// useEffect(() => {
	// 	if (selectedSigniture) {
	// 		const requestData = {
	// 			issueChequeKey: steps.signitureRequirementData?.issueChequeKey!,
	// 			otpCode: '',
	// 			signSingleSignatureLegal: selectedSigniture === 'myslef'
	// 		};

	// 		issueChequeVerifyInitiate(requestData, {
	// 			onError: (err) => {
	// 				pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
	// 			},
	// 			onSuccess: (res) => {
	// 				if (res.needInquiryWithDrawalGroup) {
	// 					if (selectedSigniture === 'myslef') {
	// 						setStepData({ overviewData: res.issueChequeOverView });
	// 					}
	// 					navigate(paths.IssueCheck.OverViewPath);
	// 				} else {
	// 					navigate(paths.IssueCheck.SignatureGroupPath);
	// 				}
	// 			}
	// 		});
	// 	}
	// }, [selectedSigniture]);
	useLoadingHandler(initiateLoading || isLoading);

	return (
		<Grid
			// container
			// sx={{ padding: matches ? '0' : '64px 0' }}
			display={'flex'}
			minHeight={"100%"}
			height={"100%"}
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
					height={"100%"}
					direction={'column'}
					justifyContent={'space-between'}
					wrap="nowrap"
				>
					<Grid>
						{/* {!matches ? (
							<Stepper
								list={[
									t('selectCheck'),
									t('checkInfo'),
									t('recivers'),
									t('issueSignature'),
									t('end')
								]}
								active={3}
							/>
						) : null} */}

						<Grid
							container
							flexWrap={'nowrap'}
							gap={'8px'}
						>
							<SvgToIcon
								icon={infoIcon}
								alt="info"
							/>
							<Typography
								variant="bodyMd"
								sx={{ marginBottom: '8px' }}
							>
								{t('activationSecondStepText')}
							</Typography>
						</Grid>
						<Grid
							container
							alignItems={'baseline'}
						>
							<Typography
								variant="bodySm"
								sx={{ margin: '0 24px' }}
							>
								{t('dontRecieveMessage')}
							</Typography>
							<ButtonAdapter
								endIcon={
									<SvgToIcon
										icon={sendAaginIcon}
										alt="send again"
									/>
								}
								onClick={handleIssueChequeInitiateSignature}
							>
								{t('sendAgain')}
							</ButtonAdapter>
						</Grid>
					</Grid>
					<Grid container>
						<ButtonAdapter
							variant="contained"
							size="medium"
							muiButtonProps={{ sx: { width: "100%", marginTop: "16px", minHeight: "48px" } }}
							//onClick={() => setOpenModal(true)}
							onClick={() => handleSubmitToNextLevel()}
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
						/>{' '}
					</BoxAdapter>
				</Grid>
			)} */}
			{/* <ModalOrBottomSheet
				breackpoint="sm"
				snapPoints={[400, 0]}
				open={openModal}
				setOpen={setOpenModal}
			>
				<SelectSignature setSelectedSigniture={setSelectedSigniture} />
			</ModalOrBottomSheet> */}
			{/* <Loader showLoader={initiateLoading || isLoading} /> */}
		</Grid>
	);
}
