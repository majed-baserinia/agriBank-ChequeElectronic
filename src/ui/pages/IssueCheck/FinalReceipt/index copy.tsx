import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import useIssueChequeFinalize from 'business/hooks/cheque/Digital Cheque/useIssueChequeFinalize';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useIssueCheckWizardData } from 'business/stores/issueCheck/useIssueCheckWizardData';

import NewCheckInfoBasics from 'ui/components/NewCheckInfoBasics';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';
import { useEffect } from 'react';

import infoIcon from '../../../../assets/icon/alerts/info.png';

export default function FinalReceipt() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { isLoading, mutate: finalSubmit } = useIssueChequeFinalize();
	const { reset, otpPage, addReceiverPage, setNewDataToWizard } = useIssueCheckWizardData((store) => store);


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
		if (addReceiverPage?.signitureRequirementData) {
			finalSubmit(
				{
					issueChequeKey: addReceiverPage.signitureRequirementData.issueChequeKey!
				},
				{
					onError: (err) => {
						if (err.status === 453 && err.instance === 'RemoveRequest') {
							reset();
							pushAlert({
								type: 'error',
								hasConfirmAction: true,
								messageText: err.detail,
								actions: {
									onCloseModal: () => {
										navigate(paths.Home);
									},
									onConfirm: () => {
										navigate(paths.Home);
									}
								}
							});
						} else {
							pushAlert({ type: 'error', hasConfirmAction: true, messageText: err.detail });
						}
					},
					onSuccess(res) {
						reset();
						pushAlert({
							type: 'success',
							hasConfirmAction: true,
							messageText: res.message,
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
					{/* //TODO: fix the problem,  */}
					{/* <CheckOverview overviewData={overviewData} /> */}
					{/* <BasicCheckDetials
								amount={overviewData?.amount}
								description={overviewData?.description}
								dueDate={overviewData?.dueDate}
								sayadNo={overviewData?.sayadNo}
								reason={overviewData?.reasonDescription}
								serialSerie={overviewData?.seri + '/' + overviewData?.serial}
							/> */}

					{/* <Grid display={'flex'} flexDirection={"column"} justifySelf={"center"} justifyContent={"center"} alignItems={"center"} gap={10}>
						<img src={infoIcon} width={60} className='mt-4' />
						<Typography variant="bodyLg" sx={{ fontWeight: "bold" }}>{t("finalizingCheque")}</Typography>
						<Typography variant="bodyMd" sx={{ marginBottom: "20px", textAlign: "justify" }}>{t("finalizingChequeDetail")}</Typography>
					</Grid> */}
					{/* {otpPage?.issueChequeOverView ? (
						<NewCheckInfoBasics
							checkData={{
								amount: otpPage.issueChequeOverView?.amount.toString(),
								description: otpPage.issueChequeOverView?.description,
								date: otpPage.issueChequeOverView?.dueDate,
								sayad: otpPage.issueChequeOverView?.sayadNo.toString(),
								reason: otpPage.issueChequeOverView?.reasonDescription,
								serie: otpPage.issueChequeOverView?.seri,
								serial: otpPage.issueChequeOverView?.serial
							}}
						/>
					) : null} */}
					{/* <PersonsList
						recievers={otpPage?.issueChequeOverView?.recievers}
						signers={otpPage?.issueChequeOverView?.signers}
					/> */}

					{/* {otpPage?.issueChequeOverView?.recievers?.map((item, index) => {
						return <Grid key={index}
							container
							dir={theme.direction}
							display={"flex"}
							direction={'column'}
							width={"100%"}
							marginTop={10}
							padding={20}
							gap={10}
							sx={{ backgroundColor: theme.palette.background.default, borderRadius: 10 }}
						>
							<div className="flex justify-between">
								<Typography variant="bodyMd">{t("first&lastName")}</Typography>
								<Typography variant="bodyMd">{item.name}</Typography>
							</div>
							<div className="flex justify-between">
								<Typography variant="bodyMd">{t("nationalIdCol")}</Typography>
								<Typography variant="bodyMd">{item.nationalNo}</Typography>
							</div>
						</Grid>
					})} */}

				</Grid>

				<Grid
					// container
					justifyContent={'space-between'}
					sx={{ marginTop: 'auto' }}
				>
					{/* <ButtonAdapter
						variant="contained"
						size="medium"
						muiButtonProps={{ sx: { width: '100%' } }}
						onClick={() => handleSubmit()}
					>
						{t('register')}
					</ButtonAdapter> */}

					{/* <ButtonAdapter
								variant="outlined"
								size="medium"
								muiButtonProps={{ sx: { width: '49%' } }}
								onClick={() => handleRefuse()}
							>
								{t('refuse')}
							</ButtonAdapter> */}
				</Grid>
			</BoxAdapter>

			<Loader showLoader={!otpPage?.issueChequeOverView || isLoading} />
		</>
	);
}
