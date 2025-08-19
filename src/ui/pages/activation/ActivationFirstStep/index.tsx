import fluentValidationResolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, RadioGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
import FirstStepCommand from 'business/application/cheque/activation/firstStep/FirstStepCommand';
import useFirstStepCall from 'business/hooks/cheque/activation/useFirstStepCall';
import { useAccountChargeStore } from 'business/stores/Chakad/ChakadQueryStore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';

import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import RadioButtonAdapter from 'ui/htsc-components/RadioButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import { pushAlert } from 'business/stores/AppAlertsStore';
import { paths } from 'ui/route-config/paths';
import { menuList } from '../../HomePage/menuList';
import { Loader, useLoadingHandler } from "@agribank/ui/components/Loader";

export default function ActivationFirstStep() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const setChakad_FirstStep = useAccountChargeStore((s) => s.setChakad_FirstStep);
	const [value, setValue] = useState('1');
	const { mutate, isLoading } = useFirstStepCall();

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	const { handleSubmit } = useForm<FirstStepCommand>({
		resolver: (values, context, options) => {
			return fluentValidationResolver(values, context, options);
		},
		context: FirstStepCommand
	});

	const submitHandler = (_: FirstStepCommand) => {
		const usersCustomerNumber = {};
		mutate(
			{ ...usersCustomerNumber },
			{
				onSuccess: (response) => {
					setChakad_FirstStep(response.activationKey);

					navigate(paths.Activation.secondStepPath);
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
	useLoadingHandler(isLoading);

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
									list={[t('accountInfo'), t('electroincSignature'), t('end')]}
									active={0}
								/>
							) : null} */}
							<Typography
								variant="bodyMd"
								sx={{ marginBottom: '8px' }}
							>
								{t('activationFirstStepText')}
							</Typography>
							<RadioGroup
								dir={theme.direction}
								name="whoToActivate"
								value={value}
								onChange={handleRadioChange}
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: '16px',
									width: matches ? '100%' : '75%'
								}}
							>
								<RadioButtonAdapter
									value="1"
									label={t('activateForMe')}
									onChange={handleRadioChange}
									checked={value == '1'}
								/>
							</RadioGroup>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%' } }}
								forwardIcon
								onClick={handleSubmit(submitHandler)}
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
						<Menu list={menuList.management} />
						<Menu list={menuList.services} />
					</BoxAdapter>
				</Grid>
			)}
			{/* <Loader showLoader={isLoading} /> */}
		</Grid>
	);
}
