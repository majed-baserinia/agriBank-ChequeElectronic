import fluentValidationResolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import GivebackChequeInitiateCommand from 'business/application/cheque/giveBackCheck/GivebackChequeInitiate/GivebackChequeInitiateCommand';
import useGivebackChequeInitiate from 'business/hooks/cheque/giveBackCheck/useGivebackChequeInitiate';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CheckInfoBox from 'ui/components/CheckInfoBox';
import Menu from 'ui/components/Menu';
 
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import TextareaAdapter from 'ui/htsc-components/TextareaAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import { menuList } from 'ui/pages/HomePage/menuList';
import { paths } from 'ui/route-config/paths';

export default function GiveBackCheckInitiate() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { selectedCheck, addNewData } = useChecklistData();

	const { mutate: givebackChequeInitiate } = useGivebackChequeInitiate();

	const { control, formState, handleSubmit, getValues } = useForm<GivebackChequeInitiateCommand>({
		resolver: (values, context, options) => {
			return fluentValidationResolver(values, context, options);
		},
		context: GivebackChequeInitiateCommand
	});

	const handleNextStep = () => {
		const data = getValues();

		givebackChequeInitiate(
			{
				...data,
				customerNumber: 0,
				sayadNo: selectedCheck?.sayadNo!,
				toIban: ''
			},
			{
				onError: (err) => {
					pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
				},
				onSuccess: (data) => {
					addNewData({ giveBackChequeInitiateResponse: data });
					navigate(paths.ReceivedChecksList.GiveBackCheckOTP);
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
						<Grid
							container
							direction={'column'}
							gap={'8px'}
						>
							{!matches ? (
								<Stepper
									list={[t('checkInfo'), t('verificationCode'), t('end')]}
									active={0}
								/>
							) : null}
							{selectedCheck && <CheckInfoBox check={selectedCheck} />}
							<Controller
								name="description"
								control={control}
								render={({ field }) => (
									<TextareaAdapter
										onChange={(value) => field.onChange(value)}
										isRequired
										label={t('giveBackDescription')}
										error={!!formState?.errors?.description}
										helperText={formState?.errors?.description?.message}
									/>
								)}
							/>

							<Grid container>
								<ButtonAdapter
									variant="contained"
									size="medium"
									muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
									forwardIcon
									onClick={handleSubmit(handleNextStep)}
								>
									{t('continue')}
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
						<Menu list={menuList.management} />
						<Menu list={menuList.services} />
					</BoxAdapter>
				</Grid>
			)}
			<Loader showLoader={false} />
		</Grid>
	);
}
