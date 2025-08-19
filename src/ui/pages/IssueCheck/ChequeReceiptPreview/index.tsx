import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import BoxAdapter from "ui/htsc-components/BoxAdapter";
import ButtonAdapter from "ui/htsc-components/ButtonAdapter";
import Stepper from "ui/htsc-components/Stepper";

// import useAccounts from "business/hooks/cheque/Digital Cheque/useAccounts";
// import useGetCheckbooks from "business/hooks/cheque/Digital Cheque/useGetCheckbooks";
// import useGetChecksheets from "business/hooks/cheque/Digital Cheque/useGetChecksheets";
import { useIssueCheckWizardData } from "business/stores/issueCheck/useIssueCheckWizardData";
// import { CheckSheet } from "common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse";
// import { useMemo, useState } from "react";
import { Loader, useLoadingHandler } from "@agribank/ui/components/Loader";
import { paths } from "ui/route-config/paths";
import { IssueChequeInitiateRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { pushAlert } from 'business/stores/AppAlertsStore';
import useIssueChequeInitiate from 'business/hooks/cheque/Digital Cheque/useIssueChequeInitiate';


export default function ChequeReceiptPreview() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));

	const { isLoading, mutate: issueChequeInitiate } = useIssueChequeInitiate();

	const { setNewDataToWizard, checkInfoPage, selectCheckPage, addReceiverPage } = useIssueCheckWizardData((store) => store);

	const handleSubmitToNextLevel = () => {
		// Check if all necessary steps and data exist
		if (!selectCheckPage || !checkInfoPage) {
			return null;
		}
		if (addReceiverPage) {
			const preparedData: IssueChequeInitiateRequest = {
				sayadNo: selectCheckPage.checkData.sayadNo,
				amount: Number(checkInfoPage.checkAmount),
				dueDate: checkInfoPage.date.toString(),
				description: checkInfoPage.description,
				reason: checkInfoPage.reason.value,
				recievers: addReceiverPage.receivers!
			};

			issueChequeInitiate(preparedData, {
				onError: (err) => {
					//TODO: navigate the user if need to
					pushAlert({
						type: 'error',
						hasConfirmAction: true,
						messageText: err.detail
					});
				},
				onSuccess: (res) => {
					//save the data
					setNewDataToWizard({
						addReceiverPage: {
							...addReceiverPage,
							signitureRequirementData: {
								issueChequeKey: res.issueChequeKey,
								isSingleSignatureLegal: res.isSingleSignatureLegal
							}
						}
					});

					//check the res and navigate based on it
					if (res.isNeedOtp) {
						navigate(paths.IssueCheck.OtpCheckPath);
					} else {
						navigate(paths.IssueCheck.SignatureRegistrationPath);
					}
				}
			});
		}
	};


	// if (isLoading)
	// 	return <Loader showLoader={true} />
	useLoadingHandler(isLoading);


	return (
		<BoxAdapter fullWidth  >
			<Grid>
				{/* {!matches ? (
					<Stepper
						list={[
							t("selectCheck"),
							t("checkInfo"),
							t("recivers"),
							t("issueSignature"),
							t("end")
						]}
						active={0}
					/>
				) : null} */}

			</Grid>

			<Grid
				container
				dir={theme.direction}
				display={"flex"}
				direction={'column'}
				width={"100%"}
				marginTop={10}
				padding={10}
				sx={{ backgroundColor: theme.palette.info[50], borderRadius: 10 }}
			>
				<div className="flex flex-col justify-center items-center p-2">
					<Typography variant="bodyLg" sx={{ marginBottom: "20px", fontWeight: "bold" }}>{t("checkDetailPageTitle")}</Typography>

					<div className="flex w-full justify-between">
						<Typography variant="bodyMd" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptObligor")}</Typography>
						<Typography variant="bodyMd" sx={{ marginBottom: "16px" }}>{selectCheckPage?.selectedAccountName}</Typography>
					</div>
					<div className="flex w-full justify-between">
						<Typography variant="bodyMd" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptAmount")}</Typography>
						<Typography variant="bodyMd" sx={{ marginBottom: "16px" }}>{Number(checkInfoPage?.checkAmount).toLocaleString()} {t('rial')}</Typography>
					</div>
					<div className="flex w-full justify-between">
						<Typography variant="bodyMd" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptDueDate")}</Typography>
						<Typography variant="bodyMd" sx={{ marginBottom: "16px" }}>{checkInfoPage?.date.toString()}</Typography>
					</div>
					<div className="flex w-full justify-between">
						<Typography variant="bodyMd" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptFor")}</Typography>
						<Typography variant="bodyMd" sx={{ marginBottom: "16px" }}>{checkInfoPage?.reason.name}</Typography>
					</div>
					<div className="flex w-full justify-between">
						<Typography variant="bodyMd" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptAccountNumber")}</Typography>
						<Typography variant="bodyMd" sx={{ marginBottom: "16px" }}>{selectCheckPage?.selectedAccount}</Typography>
					</div>
					<div className="flex w-full justify-between">
						<Typography variant="bodyMd" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptChequeSerialNumber")}</Typography>
						<Typography variant="bodyMd" sx={{ marginBottom: "16px" }}>{selectCheckPage?.selectedSheet}</Typography>
					</div>
					<div className="flex w-full justify-between">
						<Typography variant="bodyMd" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptIban")}</Typography>
						<Typography variant="bodyMd" sx={{ marginBottom: "16px" }}>{checkInfoPage?.recieverIban || "___"}</Typography>
					</div>
					<div className="flex w-full justify-between">
						<Typography variant="bodyMd" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("paymentId")}</Typography>
						<Typography variant="bodyMd" sx={{ marginBottom: "16px" }}>{checkInfoPage?.paymentId || "___"}</Typography>
					</div>
					<div className="flex flex-col w-full justify-between mt-5">
						<Typography variant="bodyMd" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptDescription")}</Typography>
						<Typography variant="bodyMd" sx={{ marginBottom: "16px" }}>
							{checkInfoPage?.description.split('\n').map((line, i) => (
								<span key={i}>
									{line}
									<br />
								</span>
							))}
						</Typography>
					</div>

				</div>
			</Grid>
			<Grid>
				<Typography variant="bodyLg" sx={{ marginTop: "20px", fontWeight: "bold" }}>{t("receivers")}</Typography>
				{addReceiverPage?.receivers?.map((item, index) => {
					return <Grid key={index}
						container
						dir={theme.direction}
						display={"flex"}
						direction={'column'}
						width={"100%"}
						marginTop={10}
						padding={10}
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
			<Grid marginTop={"auto"}>
				<ButtonAdapter
					variant="contained"
					size="medium"
					disabled={addReceiverPage?.receivers?.length == 0}
					muiButtonProps={{ sx: { width: '100%' } }}
					forwardIcon
					onClick={() => handleSubmitToNextLevel()}
				>
					{t('continue')}
				</ButtonAdapter>
			</Grid>
		</BoxAdapter >
	);
}
