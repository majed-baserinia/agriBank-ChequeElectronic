import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import { useIssueCheckWizardData } from 'business/stores/issueCheck/useIssueCheckWizardData';

import { paths } from 'ui/route-config/paths';
import { useEffect } from 'react';

import infoIcon from 'assets/icon/alerts/success.png';

export default function FinalReceipt() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { reset, otpPage } = useIssueCheckWizardData((store) => store);


	useEffect(() => {
		// setNewDataToWizard({
		// 	otpPage: {
		// 		issueChequeOverView: {
		// 			"sayadNo": "2777030055138717",
		// 			"seri": "70001",
		// 			"serial": "452562",
		// 			"amount": 1111111111,
		// 			"dueDate": "1404/03/20",
		// 			"reason": "HIPA",
		// 			"reasonDescription": "امور درمانی",
		// 			"description": "شرح",
		// 			"toIBAN": "",
		// 			"signers": null,
		// 			"recievers": [
		// 				{
		// 					"name": "ماجد",
		// 					"shahabNo": "",
		// 					"nationalNo": "4723888217",
		// 					"customerType": 1,
		// 					"customerTypeDescription": "حقیقی"
		// 				}
		// 			]
		// 		}
		// 	}
		// });
	}, [])

	const handleSubmit = () => {
		reset();
		navigate(paths.Home);
	};

	// const handleRefuse = () => {
	// 	reset();
	// 	navigate(paths.Home, { replace: true });
	// };
	// const overviewData: IssueChequeOverView = {
	// 	amount: 212,
	// 	description: 'advdsvds',
	// 	dueDate: '222222',
	// 	reason: 'dsv dsvds',
	// 	recievers: [
	// 		{
	// 			customerType:4,
	// 			name: 'name',
	// 			nationalNo: '321123123',
	// 			shahabNo: '',
	// 			customerTypeDescription: ''
	// 		},
	// 		{
	// 			customerTypeDescription: '',
	// 			customerType: 3,
	// 			name: 'name',
	// 			nationalNo: '321123123',
	// 			shahabNo: '4142'
	// 		},
	// 		{
	// 			customerTypeDescription: '',
	// 			customerType: 2,
	// 			name: 'name',
	// 			nationalNo: '321123123',
	// 			shahabNo: '4142'
	// 		},
	// 		{
	// 			customerTypeDescription: '',
	// 			customerType: 1,
	// 			name: 'name',
	// 			nationalNo: '321123123',
	// 			shahabNo: '4142'
	// 		}
	// 	],
	// 	sayadNo: 3232413.2,
	// 	seri: '21321',
	// 	serial: '324324',
	// 	signers: [
	// 		{
	// 			withdrawalGroups: [
	// 				{
	// 					customerNumber: 3241534135,
	// 					name: 'name'
	// 				},
	// 				{
	// 					customerNumber: 3241534135,
	// 					name: 'name'
	// 				},
	// 				{
	// 					customerNumber: 3241534135,
	// 					name: 'name'
	// 				},
	// 				{
	// 					customerNumber: 3241534135,
	// 					name: 'name'
	// 				}
	// 			],
	// 			groupNumber: 'grupnumber'
	// 		}
	// 	],
	// 	toIBAN: '463543'
	// };
	// useLoadingHandler(isLoading || isLoadingIssueChequeConfirm || isPending || isLoadingIssueChequeInitiateOtp);

	return (
		<>
			<BoxAdapter
				// fullWidth={matches}
				muiPaperProps={{
					sx: {
						minWidth: '25%',
						// borderRadius: matches ? 0 : '32px',
						padding: '16px',
						minHeight: "100%",
						backgroundColor: "GrayText"
					}
				}}
			>
				<Grid
					// container
					direction={'column'}
					height={"100%"}
				>
					{/* {!matches ? (
						<Stepper
							list={[
								t('selectCheck'),
								t('checkInfo'),
								t('recivers'),
								t('issueSignature'),
								t('selectSignatureGroup'),
								t('end')
							]}
							active={5}
						/>
					) : null} */}

					<Grid height={"70%"} display={'flex'} flexDirection={"column"} justifySelf={"center"} justifyContent={"center"} alignItems={"center"} gap={10}>
						<img src={infoIcon} width={60} className='mt-4' />
						<Typography variant="bodyLg" sx={{ fontWeight: "bold" }}>{t("success")}</Typography>
						<Typography variant="bodyLg" sx={{ marginBottom: "20px", textAlign: "justify" }}>{t("finalizingChequeDetailAndSeeInCartable")}</Typography>
						<Typography variant="bodyLg" sx={{ marginBottom: "20px", textAlign: "justify" }}>{otpPage?.message}</Typography>
					</Grid>

				</Grid>

				<Grid
					// container
					justifyContent={'space-between'}
					sx={{ marginTop: 'auto' }}
				>
					<ButtonAdapter
						variant="contained"
						size="medium"
						muiButtonProps={{ sx: { width: '100%', minHeight: "48px" } }}
						onClick={() => handleSubmit()}
					>
						{t('go-back')}
					</ButtonAdapter>
				</Grid>
			</BoxAdapter>

		</>
	);
}
