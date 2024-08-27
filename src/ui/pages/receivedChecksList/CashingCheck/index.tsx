import fluentValidationResolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import ChakavakPutEChequeCommand from 'business/application/cheque/cashCheck/ChakavakPutECheque/ChakavakPutEChequeCommand';
import useAccountsQuery from 'business/hooks/cheque/cashCheque/useAccountsQuery';
import useChakavakPutECheque from 'business/hooks/cheque/cashCheque/useChakavakPutECheque';
import useReceiverInquiryCheque from 'business/hooks/cheque/cashCheque/useReceiverInquiryCheque';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CashingCheckForm from 'ui/components/CashingCheck/CashingCheckForm';
import CashingCheckOverview from 'ui/components/CashingCheckOverview';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Loader from 'ui/htsc-components/loader/Loader';

import { menuList } from 'ui/pages/HomePage/menuList';
import { paths } from 'ui/route-config/paths';

export default function CashingCheck() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { selectedCheck } = useChecklistData();
	const { data: checkData, mutate: inquiryCheckData, isLoading, isError } = useReceiverInquiryCheque();
	const { mutate: chakavakPutECheque } = useChakavakPutECheque();
	const { data: AccountData, isLoading: accountsDataLoading } = useAccountsQuery();

	const methods = useForm<ChakavakPutEChequeCommand>({
		resolver: (values, context, options) => {
			return fluentValidationResolver(values, context, options);
		},
		context: ChakavakPutEChequeCommand
	});

	useEffect(() => {
		if (!selectedCheck) {
			//TODO: maybe show a error modal
			navigate(paths.Home);
		} else {
			inquiryCheckData(
				{ sayadNo: selectedCheck.sayadNo },
				{
					onSuccess: (res) => {},
					onError: (err) => {
						pushAlert({
							type: 'error',
							messageText: err.detail,
							hasConfirmAction: true,
							actions: {
								onConfirm: () => {
									navigate(paths.Home);
								},
								onCloseModal: () => {
									navigate(paths.Home);
								}
							}
						});
					}
				}
			);
		}
	}, []);

	const onSubmit = (data: ChakavakPutEChequeCommand) => {
		chakavakPutECheque(
			{ ...data, bearerInfo: null, CustomerNo: 0, Sayad: selectedCheck!.sayadNo },
			{
				onSuccess: (res) => {},
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
						<Grid
							container
							direction={'column'}
							gap={'8px'}
						>
							<Title>{t('cashingCheck')}</Title>
							{checkData ? (
								<CashingCheckOverview check={checkData} />
							) : isError ? (
								<Grid
									container
									direction={'column'}
									gap={'8px'}
									sx={{
										backgroundColor: theme.palette.primary[50],
										padding: '16px',
										borderRadius: '16px'
									}}
								>
									<Typography
										variant="bodyMd"
										fontWeight={'medium'}
										align="center"
									>
										{t('noCheckInfo')}
									</Typography>{' '}
								</Grid>
							) : null}
							<FormProvider {...methods}>
								<CashingCheckForm AccountData={AccountData} />
							</FormProvider>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
								forwardIcon
								onClick={methods.handleSubmit(onSubmit)}
							>
								{t('confirm')}
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
						/>
					</BoxAdapter>
				</Grid>
			)}
			<Loader showLoader={isLoading || accountsDataLoading} />
		</Grid>
	);
}
