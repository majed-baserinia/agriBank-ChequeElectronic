import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import useSecondStepCall from 'business/hooks/cheque/activation/useSecondStepCall';
import useThirdStepCall from 'business/hooks/cheque/activation/useThirdStepCall';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useAccountChargeStore } from 'business/stores/Chakad/ChakadQueryStore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
 
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';

import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';
import infoIcon from '../../../../assets/icon/info-circle.svg';
import sendAaginIcon from '../../../../assets/icon/refresh-alert.svg';
import { menuList } from '../../HomePage/menuList';

export default function ActivationSecondStep() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [isThirdStep, setIsThirdStep] = useState(false);

	const activationKey = useAccountChargeStore((s) => s.activationKey);

	const { mutate: sendAgain, isLoading } = useSecondStepCall();
	const { mutate: submition, isLoading: submitLoading } = useThirdStepCall();

	useEffect(() => {
		handleSendAgain();
	}, []);

	const handleSendAgain = () => {
		sendAgain(
			{ activationKey: activationKey },
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

	const handleSubmit = () => {
		submition(
			{ activationKey: activationKey },
			{
				onSuccess: (response) => {
					setIsThirdStep(true);

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
									list={[t('accountInfo'), t('electroincSignature'), t('end')]}
									active={isThirdStep ? 3 : 1}
								/>
							) : null}

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
									variant="bodyMd"
									sx={{ margin: '0 24px' }}
								>
									{t('dontRecieveMessage')}
								</Typography>
								<ButtonAdapter
									onClick={handleSendAgain}
									endIcon={
										<SvgToIcon
											icon={sendAaginIcon}
											alt="send again"
										/>
									}
								>
									{t('sendAgain')}
								</ButtonAdapter>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%' } }}
								onClick={handleSubmit}
							>
								{t('FinalSignatureRegistration')}
							</ButtonAdapter>
						</Grid>
					</Grid>
					<Loader showLoader={submitLoading || isLoading} />
				</BoxAdapter>
			</Grid>
			{matches ? null : (
				<Grid
				item
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<Menu list={menuList.management} />
						<Menu list={menuList.services} />
					</BoxAdapter>
				</Grid>
			)}
		</Grid>
	);
}
