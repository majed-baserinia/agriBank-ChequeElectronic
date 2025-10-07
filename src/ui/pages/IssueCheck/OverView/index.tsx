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
import { paths } from 'ui/route-config/paths';
import { Loader, useLoadingHandler } from "@agribank/ui/components/Loader";

import infoIcon from '../../../../assets/icon/alerts/info.png';

export default function OverView() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { isLoading, mutate: finalSubmit } = useIssueChequeFinalize();
	const { reset, otpPage, addReceiverPage, setNewDataToWizard } = useIssueCheckWizardData((store) => store);

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
						navigate(paths.IssueCheck.FinalReceipt);
					}
				}
			);
		}
	};
	useLoadingHandler(!otpPage?.issueChequeOverView || isLoading);

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

					<Grid display={'flex'} flexDirection={"column"} justifySelf={"center"} justifyContent={"center"} alignItems={"center"} gap={10}>
						<img src={infoIcon} width={60} className='mt-4' />
						<Typography variant="bodyLg" sx={{ fontWeight: "bold" }}>{t("finalizingCheque")}</Typography>
						<Typography variant="bodyMd" sx={{ marginBottom: "20px", textAlign: "justify" }}>{t("finalizingChequeDetail")}</Typography>
					</Grid>
					{otpPage?.issueChequeOverView ? (
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
					) : null}
					{/* <PersonsList
						recievers={otpPage?.issueChequeOverView?.recievers}
						signers={otpPage?.issueChequeOverView?.signers}
					/> */}

					{otpPage?.issueChequeOverView?.recievers?.map((item, index) => {
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
					})}

				</Grid>

				<Grid
					// container
					justifyContent={'space-between'}
					sx={{ marginTop: 'auto' }}
				>
					<ButtonAdapter
						variant="contained"
						size="medium"
						muiButtonProps={{ sx: { width: '100%' } }}
						onClick={() => handleSubmit()}
					>
						{t('registerAndSave')}
					</ButtonAdapter>

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

			{/* <Loader showLoader={!otpPage?.issueChequeOverView || isLoading} /> */}
		</>
	);
}
