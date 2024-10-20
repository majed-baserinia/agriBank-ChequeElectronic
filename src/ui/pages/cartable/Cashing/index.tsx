import fluentValidationResolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import ChakavakPutEChequeCommand from 'business/application/cheque/cashCheck/ChakavakPutECheque/ChakavakPutEChequeCommand';
import useAccountsQuery from 'business/hooks/cheque/cashCheque/useAccountsQuery';
import useChakavakPutECheque from 'business/hooks/cheque/cashCheque/useChakavakPutECheque';
import useReceiverInquiryCheque from 'business/hooks/cheque/cashCheque/useReceiverInquiryCheque';
import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CashingCheckForm from 'ui/components/CashingCheck/CashingCheckForm';
import Menu from 'ui/components/Menu';
import NewCheckInfoBasics from 'ui/components/NewCheckInfoBasics';

import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Loader from 'ui/htsc-components/loader/Loader';

import { menuList } from 'ui/pages/HomePage/menuList';
import { paths } from 'ui/route-config/paths';

export default function Cashing() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { selectedCheck } = useCartableChecklistData();
	const { data: checkData, mutate: inquiryCheckData, isLoading, isError } = useReceiverInquiryCheque();
	const { mutate: chakavakPutECheque, isLoading: isLoadingSubmit } = useChakavakPutECheque();
	const { data: AccountData, isLoading: accountsDataLoading } = useAccountsQuery();

	const methods = useForm<ChakavakPutEChequeCommand>({
		defaultValues: {
			NonPaymentCertificate: false
		},
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
			inquiryCheckData({ sayadNo: Number(selectedCheck.dataFromList?.sayadNo) });
		}
	}, []);

	const onSubmit = (data: ChakavakPutEChequeCommand) => {
		chakavakPutECheque({
			...data,
			bearerInfo: null,
			CustomerNo: 0,
			Sayad: Number(selectedCheck!.dataFromList?.sayadNo)
		});
	};
	return (
		<Grid
			container
			sx={{ padding: { xs: '0', md: '64px 0' } }}
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
							borderRadius: { md: '32px', xs: 0 },
							padding: '16px'
						}
					}}
				>
					<Grid
						minHeight={{ xs: 'calc(100vh - 32px)', md: 'calc(100vh - 192px)' }}
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
							{checkData ? (
								// <CashingCheckOverview check={checkData} />
								<NewCheckInfoBasics
									hasTitle
									checkData={{
										amount: checkData?.amount.toString(),
										description: checkData?.description,
										date: checkData?.dueDate,
										sayad: checkData?.sayadId,
										reason: checkData?.reasonDescription,
										serie: checkData?.seriesNo,
										serial: checkData?.serialNo,
										sheba: checkData.fromIban,
										checkStatus: checkData?.chequeStatusDescription
									}}
								/>
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
								onClick={methods.handleSubmit(onSubmit)}
							>
								{t('confirm')}
							</ButtonAdapter>
						</Grid>
					</Grid>
				</BoxAdapter>
			</Grid>

			<Grid
				item
				md={3}
				dir={theme.direction}
				display={{ md: 'block', xs: 'none' }}
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

			<Loader showLoader={isLoading || accountsDataLoading || isLoadingSubmit} />
		</Grid>
	);
}
