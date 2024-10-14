import fluentValidationResolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import GivebackChequeInitiateCommand from 'business/application/cheque/giveBackCheck/GivebackChequeInitiate/GivebackChequeInitiateCommand';
import useReceiverInquiryCheque from 'business/hooks/cheque/cashCheque/useReceiverInquiryCheque';
import useGivebackChequeInitiate from 'business/hooks/cheque/giveBackCheck/useGivebackChequeInitiate';
import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import NewCheckInfoBasics from 'ui/components/NewCheckInfoBasics';

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

	const { selectedCheck, addNewCartableData } = useCartableChecklistData();
	const { data: checkData, mutate: inquiryCheckData, isLoading: inquiryLoading } = useReceiverInquiryCheque();
	const { mutate: givebackChequeInitiate, isLoading: submitLoading } = useGivebackChequeInitiate();

	const { control, formState, handleSubmit, getValues } = useForm<GivebackChequeInitiateCommand>({
		resolver: (values, context, options) => {
			return fluentValidationResolver(values, context, options);
		},
		context: GivebackChequeInitiateCommand
	});

	useEffect(() => {
		if (selectedCheck) {
			inquiryCheckData(
				{ sayadNo: Number(selectedCheck?.dataFromList?.sayadNo) },
				{
					onSuccess: () =>
						addNewCartableData({ selectedCheck: { ...selectedCheck, iquiriedData: checkData } })
				}
			);
		}
	}, []);

	const handleNextStep = () => {
		const data = getValues();
		if (selectedCheck?.dataFromList) {
			givebackChequeInitiate(
				{
					...data,
					customerNumber: 0,
					sayadNo: Number(selectedCheck.dataFromList.sayadNo),
					toIban: ''
				},
				{
					onSuccess: (data) => {
						addNewCartableData({ giveBackChequeInitiateResponse: data });
						navigate(paths.cartable.GiveBackCheckOTP);
					}
				}
			);
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
				<BoxAdapter
					fullWidth={matches}
					muiPaperProps={{
						sx: {
							minWidth: '25%',
							borderRadius: matches ? 0 : '32px',
							padding: '16px'
						}
					}}
				>
					<Grid
						minHeight={matches ? 'calc(100vh - 32px)' : 'calc(100vh - 192px)'}
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

							{checkData ? (
								<NewCheckInfoBasics
									hasTitle
									checkData={{
										amount: checkData.amount.toString(),
										description: checkData.description,
										date: checkData.dueDate,
										sayad: checkData.sayadId,
										reason: checkData.reasonDescription,
										serie: checkData.seriesNo,
										serial: checkData.serialNo,
										checkStatus: checkData.chequeStatusDescription
									}}
								/>
							) : null}
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
						<Menu list={menuList.management} />
						<Menu list={menuList.services} />
					</BoxAdapter>
				</Grid>
			)}
			<Loader showLoader={submitLoading || inquiryLoading} />
		</Grid>
	);
}
