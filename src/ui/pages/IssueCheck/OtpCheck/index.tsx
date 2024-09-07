import resolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import CheckInitiateOtpCommand from 'business/application/cheque/Digital Cheque/Send Otp/CheckInitiateOtpCommand';
import VerifyOtpCommand from 'business/application/cheque/Digital Cheque/Verify Otp/VerifyOtpCommand';
import useCheckInitiateOtp from 'business/hooks/cheque/Digital Cheque/useCheckInitiateOtp';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/issueCheck/dataSteps';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Otp from 'ui/htsc-components/Otp';
import Stepper from 'ui/htsc-components/Stepper';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { paths } from 'ui/route-config/paths';
import { menuList } from '../../HomePage/menuList';

export default function OtpCheck() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { t } = useTranslation();
	const navigate = useNavigate();

	const GetStepData = useDataSteps((s) => s.steps.signitureRequirementData);
	const {
		data: CheckInitiateOtpData,
		mutate: CheckInitiateOtpMutate,
		error: CheckInitiateOtpError
	} = useCheckInitiateOtp();

	const {
		register: VerifyOtpRequest,
		handleSubmit: handleSubmitForVerifyOtp,
		formState,
		control
	} = useForm<VerifyOtpCommand>({
		resolver: (values, context, options) => {
			values = { ...values };
			return resolver(values, context, options);
		},
		context: VerifyOtpCommand
	});

	useEffect(() => {
		CheckInitiateOtpMutate(
			{ issueChequeKey: GetStepData?.issueChequeKey },
			{
				onError: (err) => {
					pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
				}
			}
		);
	}, []);

	const CheckInitiateOtp = (data: CheckInitiateOtpCommand) => {
		CheckInitiateOtpMutate(data, {
			onSuccess: (response) => {
				pushAlert({
					type: 'success',
					messageText: response.message,
					hasConfirmAction: true,
					actions: {
						onCloseModal: () => navigate(paths.Home),
						onConfirm: () => navigate(paths.Home)
					}
				});
			},
			onError: (err) => {
				if (err.status == 453) {
					pushAlert({
						type: 'error',
						messageText: err.detail,
						hasConfirmAction: true,
						actions: {
							onCloseModal: () => navigate(paths.Home),
							onConfirm: () => navigate(paths.Home)
						}
					});
				}
				pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
			}
		});
	};
	const handleSendAgain = () => {
		CheckInitiateOtpMutate(
			{ issueChequeKey: GetStepData?.issueChequeKey },
			{
				onSuccess: (response) => {
					pushAlert({
						type: 'info',
						messageText: response.message,
						hasConfirmAction: true
					});
				},
				onError: (err) => {
					pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
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
							<Title>{t('issueElCheck')}</Title>
							{!matches ? (
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
											error={!!formState?.errors?.otpCode}
											helperText={formState?.errors?.otpCode?.message}
											label={t('activationCodeOtp')}
											maxLength={CheckInitiateOtpData?.codeLength}
											timerInSeconds={{ timer: CheckInitiateOtpData?.lifeTime! }}
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
								muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
								onClick={handleSubmitForVerifyOtp(CheckInitiateOtp)}
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
