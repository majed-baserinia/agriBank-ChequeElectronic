import resolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import CheckInitiateOtpCommand from 'business/application/cheque/Digital Cheque/Send Otp/CheckInitiateOtpCommand';
import VerifyOtpCommand from 'business/application/cheque/Digital Cheque/Verify Otp/VerifyOtpCommand';
import useCheckInitiateOtp from 'business/hooks/cheque/Digital Cheque/useCheckInitiateOtp';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';

import useVerifyOtp from 'business/hooks/cheque/Digital Cheque/useVerifyOtp';
import usePostMessage from 'business/hooks/postMessage/usePostMessage';
import { useIssueCheckWizardData } from 'business/stores/issueCheck/useIssueCheckWizardData';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Otp from 'ui/htsc-components/Otp';
import Stepper from 'ui/htsc-components/Stepper';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { paths } from 'ui/route-config/paths';
import { menuList } from '../../HomePage/menuList';
import useIssueChequeInitiateOtp from 'business/hooks/cheque/Digital Cheque/useIssueChequeInitiateOtp';
import useIssueChequeConfirm from 'business/hooks/cheque/Digital Cheque/useIssueChequeConfirm';
import { useLoadingHandler } from '@agribank/ui/components/Loader';

export default function OtpCheck() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [otpLifeTime, setOtpLifeTime] = useState(0);
	const { setNewDataToWizard, addReceiverPage, accountType } = useIssueCheckWizardData((s) => s);
	usePostMessage({ callback: readOtp, message: { type: 'GetOTP', OTPLen: '8', ReadMode: 'UserConsent' } });

	const { mutate: verifyOtp, error: veryError, isLoading } = useVerifyOtp();
	const { mutate: IssueChequeConfirm, isLoading: isLoadingIssueChequeConfirm } = useIssueChequeConfirm();
	const { data: dataCheckInitiateOtpData, mutate: CheckInitiateOtpMutate, isPending } = useCheckInitiateOtp();
	const { isLoading: isLoadingIssueChequeInitiateOtp, mutate: issueChequeInitiateOtp, data: dataIssueChequeInitiateOtp } = useIssueChequeInitiateOtp();

	const {
		handleSubmit: handleSubmitForVerifyOtp,
		formState,
		control,
		setValue
	} = useForm<VerifyOtpCommand>({
		resolver: (values, context, options) => {
			values = { ...values };
			return resolver(values, context, options);
		},
		context: VerifyOtpCommand
	});

	function readOtp(e: MessageEvent<{ type: string; OTP: string }>) {
		if (e.data.type === 'ResOTP') {
			setValue('otpCode', e.data.OTP);
		}
	}

	useEffect(() => {
		if (dataCheckInitiateOtpData) {
			setOtpLifeTime(dataCheckInitiateOtpData.lifeTime);
		}
		if (dataIssueChequeInitiateOtp) {
			setOtpLifeTime(dataIssueChequeInitiateOtp.lifeTime);
		}
	}, [dataCheckInitiateOtpData, dataIssueChequeInitiateOtp]);

	useEffect(() => {
		handleSendAgain()
	}, []);

	const handleSendAgain = () => {
		if (accountType == "IndividualCheque")
			CheckInitiateOtpMutate(
				{ issueChequeKey: addReceiverPage?.signitureRequirementData?.issueChequeKey },
				{
					onError: (err) => {
						pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
					}
				}
			);

		if (accountType == "CorporateCheque")
			issueChequeInitiateOtp(
				{ issueChequeKey: addReceiverPage?.signitureRequirementData?.issueChequeKey! },
				{
					onError: (err) => {
						pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
					},
					onSuccess: (res) => {
						pushAlert({
							type: 'success',
							messageText: res.message,
							hasConfirmAction: true,
						});
					}
				}
			)
	};

	const verify = (data: VerifyOtpCommand) => {
		if (accountType == "IndividualCheque" && addReceiverPage?.signitureRequirementData) {
			verifyOtp(
				{
					issueChequeKey: addReceiverPage.signitureRequirementData.issueChequeKey!,
					signSingleSignatureLegal: addReceiverPage.signitureRequirementData.isSingleSignatureLegal!,
					otpCode: data.otpCode
				},
				{
					onError: (err) => {
						pushAlert({
							type: 'error',
							messageText: err.detail,
							hasConfirmAction: true
						});
					},
					onSuccess: (res) => {
						setNewDataToWizard({
							otpPage: {
								needInquiryWithDrawalGroup: res.needInquiryWithDrawalGroup,
								issueChequeOverView: res.issueChequeOverView
							}
						});
						navigate(paths.IssueCheck.OverViewPath);
					}
				}
			);
		}

		if (accountType == "CorporateCheque" && addReceiverPage?.signitureRequirementData) {
			IssueChequeConfirm(
				{
					issueChequeKey: addReceiverPage.signitureRequirementData.issueChequeKey!,
					otpCode: data.otpCode
				},
				{
					onError: (err) => {
						pushAlert({
							type: 'error',
							messageText: err.detail,
							hasConfirmAction: true
						});
					},
					onSuccess: (res) => {
						setNewDataToWizard({
							otpPage: {
								message: res.message
							}
						});
						navigate(paths.IssueCheck.FinalReceiptSimple);
					}
				}
			);
		};
	}

	useLoadingHandler(isLoading || isLoadingIssueChequeConfirm || isPending || isLoadingIssueChequeInitiateOtp);

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
						<Grid>
							{/* {!matches ? (
								<Stepper
									list={[
										t('selectCheck'),
										t('checkInfo'),
										t('recivers'),
										t('activationCode'),
										t('end')
									]}
									active={3}
								/>
							) : null} */}

							<Grid
								marginBottom={'64px'}
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
									{t('reciveOptText')}
								</Typography>
							</Grid>

							<Grid
								item
								xs={12}
								sm={12}
								md={6}
								lg={6}
								xl={6}
							>
								<Controller
									name="otpCode"
									control={control}
									render={({ field }) => (
										<Otp
											onChange={(value) => field.onChange(value)}
											defaultValue={field.value}
											error={!!formState?.errors?.otpCode}
											helperText={formState?.errors?.otpCode?.message}
											label={t('activationCodeOtp')}
											maxLength={accountType == "IndividualCheque" ? dataCheckInitiateOtpData?.codeLength : dataIssueChequeInitiateOtp?.codeLength}
											timerInSeconds={{ timer: otpLifeTime }}
											handleResend={handleSendAgain}
										/>
									)}
								/>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '16px', minHeight: "48px" } }}
								onClick={handleSubmitForVerifyOtp(verify)}
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
						/>{' '}
					</BoxAdapter>
				</Grid>
			)}
		</Grid>
	);
}
