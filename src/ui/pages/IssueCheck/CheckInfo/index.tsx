import validator from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
 
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import InputAdapter from 'ui/htsc-components/InputAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import TextareaAdapter from 'ui/htsc-components/TextareaAdapter';

import CheckInfoFormValidatorCommand from 'business/application/cheque/Digital Cheque/CheckInfoFormValidator/CheckInfoFormValidatorCommand';
import useGetReasonCodes from 'business/hooks/cheque/Digital Cheque/useGetReasonCodes';
import { useDataSteps } from 'business/stores/issueCheck/dataSteps';
import { Controller, useForm } from 'react-hook-form';
import BottomSheetSelect from 'ui/htsc-components/BottomSheetSelect';
import DatePickerAdapter from 'ui/htsc-components/DatePickerAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';
import { menuList } from '../../HomePage/menuList';
import { useEffect } from 'react';
import { pushAlert } from 'business/stores/AppAlertsStore';

export default function CheckInfo() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { data: reasonCodes, isLoading: isPendingtoGetReasons, isError, error } = useGetReasonCodes();
	const setDataForNextStep = useDataSteps((store) => store.setStepData);

	const { control, formState, getValues, handleSubmit } = useForm<CheckInfoFormValidatorCommand>({
		resolver: (values, context, options) => {
			return validator(values, context, options);
		},
		context: CheckInfoFormValidatorCommand
	});


	useEffect(()=>{
		if(error){
			pushAlert({
				type: 'error',
				//TODO: fix the below message 
				messageText: "error.detail",
				hasConfirmAction: true,
				actions: {
					onCloseModal: () => navigate('/cheque'),
					onConfirm: () => navigate('/cheque')
				}
			});
		}
	},[error])
	
	const handleNextStep = () => {
		setDataForNextStep({
			issueCheckDetail: getValues()
		});

		navigate(paths.IssueCheck.addReceiversPath);
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
									active={1}
								/>
							) : null}
							<Typography variant="bodyMd">{t('infoCheckText')}</Typography>
							<Grid
								container
								spacing={'16px'}
							>
								<Grid
									item
									xs={12}
									sm={6}
								>
									<Controller
										name="checkAmount"
										control={control}
										render={({ field }) => (
											<InputAdapter
												isRequired
												label={t('checkAmount')}
												onChange={(value) => field.onChange(value)}
												type="money"
												error={!!formState?.errors?.checkAmount}
												helperText={formState?.errors?.checkAmount?.message}
											/>
										)}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={6}
								>
									<Controller
										name="date"
										control={control}
										render={({ field }) => (
											<DatePickerAdapter
												label={t('date')}
												onChange={(date) => {
													field.onChange(date?.toString());
												}}
												error={!!formState?.errors?.date}
												helperText={formState?.errors?.date?.message}
											/>
										)}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={6}
								>
									<Controller
										name="reason"
										control={control}
										render={({ field }) => (
											<BottomSheetSelect
												isRequired
												label={t('reason')}
												list={
													isPendingtoGetReasons || isError
														? []
														: reasonCodes.map((reason) => ({
																value: reason.reasonCode,
																name: reason.description
															}))
												}
												onChange={(item) => {
													field.onChange(item);
												}}
												error={!!formState?.errors?.reason}
												helperText={formState?.errors?.reason?.message}
											/>
										)}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<Controller
										name="description"
										control={control}
										render={({ field }) => (
											<TextareaAdapter
												onChange={(value) => field.onChange(value)}
												isRequired
												label={t('description')}
												error={!!formState?.errors?.description}
												helperText={formState?.errors?.description?.message}
											/>
										)}
									/>
								</Grid>
							</Grid>
						</Grid>
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
			<Loader showLoader={isPendingtoGetReasons} />
		</Grid>
	);
}
