import fluentValidationResolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import RejectGiveBackChequeVerifyOtpCommand from 'business/application/cheque/rejectGiveBackCheck/RejectGiveBackChequeVerifyOtp/RejectGiveBackChequeVerifyOtpCommand';
import useRejectGiveBackChequeFinalize from 'business/hooks/cheque/rejectGivebackCheque/useRejectGiveBackChequeFinalize';
import useRejectGiveBackChequeInitiateOtp from 'business/hooks/cheque/rejectGivebackCheque/useRejectGiveBackChequeInitiateOtp';
import useRejectGiveBackChequeVerifyOtp from 'business/hooks/cheque/rejectGivebackCheque/useRejectGiveBackChequeVerifyOtp';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
 
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Otp from 'ui/htsc-components/Otp';
import Stepper from 'ui/htsc-components/Stepper';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import Loader from 'ui/htsc-components/loader/Loader';
import { menuList } from 'ui/pages/HomePage/menuList';
import { paths } from 'ui/route-config/paths';

export default function RejectGiveBackCheckOTP() {
	const theme = useTheme();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const [sendAgain, setSendAgain] = useState(false);
	const { RejectGiveBackChequeInitiateResponse } = useChecklistData();
	console.log({ RejectGiveBackChequeInitiateResponse });

	const { mutate: initiateOtp, data: initiateOtpRes, isLoading: initLoading } = useRejectGiveBackChequeInitiateOtp();
	const { mutate: verifyOtp, isLoading: verifyLoading } = useRejectGiveBackChequeVerifyOtp();
	const { mutate: finalizeRejectGiveBack, isLoading: finalizeLoading } = useRejectGiveBackChequeFinalize();

	const { handleSubmit, formState, control } = useForm<RejectGiveBackChequeVerifyOtpCommand>({
		resolver: (values, context, options) => fluentValidationResolver(values, context, options),
		context: RejectGiveBackChequeVerifyOtpCommand
	});

	useEffect(() => {
		console.log('%c sdklahgjkdssdha;gsdfjsdfhsgh;as', 'color:blue;');

		initiateOtp(
			{ transferChequeKey: RejectGiveBackChequeInitiateResponse?.transferChequeKey! },
			{
				onError: (err) => {
					pushAlert({
						type: 'error',
						messageText: err.detail,
						hasConfirmAction: true,
						actions: {
							onCloseModal: () => {
								navigate(paths.Home);
							},
							onConfirm: () => {
								navigate(paths.Home);
							}
						}
					});
				},
				onSuccess: () => {}
			}
		);
	}, [sendAgain]);

	const VerifyOtpHandler = (data: RejectGiveBackChequeVerifyOtpCommand) => {
		verifyOtp(
			{
				...data,
				selectSingleSignatureLegal: true,
				transferChequeKey: RejectGiveBackChequeInitiateResponse?.transferChequeKey!
			},
			{
				onError: (err) => {
					pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
				},
				onSuccess: (res) => {
					finalizeRejectGiveBack(
						{ transferChequeKey: RejectGiveBackChequeInitiateResponse?.transferChequeKey! },
						{
							onError: (err) => {},
							onSuccess: (res) => {
								pushAlert({
									type: 'success',
									messageText: res.message,
									hasConfirmAction: true,
									actions: {
										onCloseModal: () => {
											navigate(paths.Home);
										},
										onConfirm: () => {
											navigate(paths.Home);
										}
									}
								});
							}
						}
					);
				}
			}
		);
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
						<Grid>
							{!matches ? (
								<Stepper
									list={[t('checkInfo'), t('verificationCode'), t('end')]}
									active={1}
								/>
							) : null}

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
									{t('transferOtpText')}
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
											label={t('activationCodeOtp')}
											maxLength={initiateOtpRes?.codeLength}
											timerInSeconds={{ timer: initiateOtpRes?.lifeTime! }}
											onChange={(value) => field.onChange(value)}
											handleResend={() => setSendAgain(!sendAgain)}
											error={!!formState?.errors?.otpCode}
											helperText={formState?.errors?.otpCode?.message}
										/>
									)}
								/>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
								onClick={handleSubmit(VerifyOtpHandler)}
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
			<Loader showLoader={initLoading || verifyLoading || finalizeLoading} />
		</Grid>
	);
}
