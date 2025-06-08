import { Box, Divider, Grid, MenuItem, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Menu from "ui/components/Menu";

import BoxAdapter from "ui/htsc-components/BoxAdapter";
import ButtonAdapter from "ui/htsc-components/ButtonAdapter";
import SelectAdapter from "ui/htsc-components/SelectAdapter";
import Stepper from "ui/htsc-components/Stepper";

import keshavarzi from "assets/icon/Banks/Color/Keshavarzi.svg";
import useAccounts from "business/hooks/cheque/Digital Cheque/useAccounts";
import useGetCheckbooks from "business/hooks/cheque/Digital Cheque/useGetCheckbooks";
import useGetChecksheets from "business/hooks/cheque/Digital Cheque/useGetChecksheets";
import { useIssueCheckWizardData } from "business/stores/issueCheck/useIssueCheckWizardData";
import { CheckSheet } from "common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse";
import { useEffect, useMemo, useState } from "react";
import ChipsAdapter from "ui/htsc-components/chipsAdapter";
import Loader from "ui/htsc-components/loader/Loader";
import { paths } from "ui/route-config/paths";
import { menuList } from "./menuList";


export default function ChequeReceiptPreview() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	const { checkInfoPage, selectCheckPage } = useIssueCheckWizardData((store) => store);

	const { data: AccountData, isLoading: loadingAccount } = useAccounts();
	const { data: checkbooks, mutate: getCheckbooks, isLoading: loadingCheckBook } = useGetCheckbooks();
	const { data: checksheets, mutate: getChecksheets, isLoading: loadingCheckSheet } = useGetChecksheets();

	const [selectedAccountNumber, setSelectedAccountNumber] = useState("");
	const [selectedCheckbook, setSelectedCheckbook] = useState<string>();
	const [selectedChecksheet, setSelectedChecksheet] = useState<CheckSheet>();



	const handleNextStep = () => {
		//save the needed data for next page
		setNewDataToWizard({
			selectCheckPage: {
				selectedAccount: selectedAccountNumber,
				selectedCheckbook: selectedCheckbook!,
				selectedSheet: selectedChecksheet!.sayadNo.toString(),
				checkData: selectedChecksheet!
			}
		});

		//navigate next page
		navigate(paths.IssueCheck.CheckInfoPath);
	};

	const sortedChequeSheets = useMemo(() => {
		return checksheets?.toSorted((a, b) => {
			if (a.isUsed && !b.isUsed) {
				return 1;
			}
			if ((a.isUsed && b.isUsed) || (!a.isUsed && !b.isUsed)) {
				return 0;
			}
			return -1;
		});
	}, [checksheets]);

	if (loadingAccount || loadingCheckBook || loadingCheckSheet)
		return <Loader showLoader={true} />


	return (
		<Grid
			container
			// sx={{ padding: matches ? "0" : "0 0" }}
			height={"100%"}
			width={"100%"}
			display={"flex"}
			justifyContent={"center"}
			gap={"24px"}
			dir={theme.direction}
		>

			<BoxAdapter fullWidth  >
				<Grid>
					{!matches ? (
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
					) : null}

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
							<Typography variant="bodyLg" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptObligor")}</Typography>
							<Typography variant="bodyLg" sx={{ marginBottom: "16px" }}>____</Typography>
						</div>
						<div className="flex w-full justify-between">
							<Typography variant="bodyLg" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptAmount")}</Typography>
							<Typography variant="bodyLg" sx={{ marginBottom: "16px" }}>{Number(checkInfoPage?.checkAmount).toLocaleString()} {t('rial')}</Typography>
						</div>
						<div className="flex w-full justify-between">
							<Typography variant="bodyLg" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptDueDate")}</Typography>
							<Typography variant="bodyLg" sx={{ marginBottom: "16px" }}>{checkInfoPage?.date.toString()}</Typography>
						</div>
						<div className="flex w-full justify-between">
							<Typography variant="bodyLg" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptFor")}</Typography>
							<Typography variant="bodyLg" sx={{ marginBottom: "16px" }}>{checkInfoPage?.reason.name}</Typography>
						</div>
						<div className="flex w-full justify-between">
							<Typography variant="bodyLg" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptIban")}</Typography>
							<Typography variant="bodyLg" sx={{ marginBottom: "16px" }}>____</Typography>
						</div>
						<div className="flex w-full justify-between">
							<Typography variant="bodyLg" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptAccountNumber")}</Typography>
							<Typography variant="bodyLg" sx={{ marginBottom: "16px" }}>{selectCheckPage?.selectedAccount}</Typography>
						</div>
						<div className="flex w-full justify-between">
							<Typography variant="bodyLg" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptChequeSerialNumber")}</Typography>
							<Typography variant="bodyLg" sx={{ marginBottom: "16px" }}>{selectCheckPage?.selectedSheet}</Typography>
						</div>
						<div className="flex flex-col w-full justify-between">
							<Typography variant="bodyLg" sx={{ marginBottom: "16px", fontWeight: "bold" }}>{t("chequeReceiptDescription")}</Typography>
							<Typography variant="bodyLg" sx={{ marginBottom: "16px" }}>
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

			</BoxAdapter >


		</Grid >
	);
}
