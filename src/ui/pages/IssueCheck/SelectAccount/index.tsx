import { Box, Grid, MenuItem, Typography, useMediaQuery, useTheme, Menu } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import Menu from "ui/components/Menu";

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
import { useMemo, useState } from "react";
import ChipsAdapter from "ui/htsc-components/chipsAdapter";
import { Loader, useLoadingHandler } from "@agribank/ui/components/Loader";
import { paths } from "ui/route-config/paths";
import { usePostMessageRaw } from "@agribank/post-message";

export default function SelectAccount() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	const { setNewDataToWizard, selectCheckPage } = useIssueCheckWizardData((store) => store);

	const { data: AccountData, isLoading: loadingAccount } = useAccounts();
	const { data: checkbooks, mutate: getCheckbooks, isLoading: loadingCheckBook } = useGetCheckbooks();
	const { data: checksheets, mutate: getChecksheets, isLoading: loadingCheckSheet } = useGetChecksheets();

	const [selectedAccountNumber, setSelectedAccountNumber] = useState("");
	const [selectedCheckbook, setSelectedCheckbook] = useState<string>();
	const [selectedChecksheet, setSelectedChecksheet] = useState<CheckSheet>();

	// useEffect(() => {
	// 	if (!isLoading && selectCheckPage) {
	// setSelectedAccountNumber(selectCheckPage.selectedAccount);
	// setSelectedCheckbook(selectCheckPage.selectedCheckbook);
	// setSelectedChecksheet(selectCheckPage.checkData);
	// 	}
	// }, [isLoading]);

	const handleNextStep = () => {
		setNewDataToWizard({
			selectCheckPage: {
				selectedAccount: selectedAccountNumber,
				selectedCheckbook: selectedCheckbook!,
				selectedSheet: selectedChecksheet!.sayadNo.toString(),
				checkData: selectedChecksheet!,
				selectedAccountName: selectCheckPage?.selectedAccountName || ""
			}
		});

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

	useLoadingHandler(loadingAccount || loadingCheckBook || loadingCheckSheet);

	return (
		<Grid
			// container
			// sx={{ padding: matches ? "0" : "0 0" }}
			height={"100%"}
			width={"100%"}
			display={"flex"}
			justifyContent={"center"}
			gap={"24px"}
			dir={theme.direction}
		>

			<BoxAdapter fullWidth  >
				<Grid
					minHeight={"100%"}
					container
					display={"flex"}
					direction={"column"}
					justifyContent={"space-between"}
					wrap="nowrap"
				>
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
						<Typography
							variant="bodyMd"
							sx={{ marginBottom: "16px" }}
						>
							{t("selectAaccountText")}
						</Typography>
						<Grid
							container
							spacing={"24px"}
							direction={"row"}
						>
							<Grid
								item
								xs={12}
								sm={12}
								md={6}
								lg={6}
								xl={6}
								sx={{ order: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1 } }}
							>
								<SelectAdapter
									onChange={() => { }}
									label={t("accountsList")}
									renderValue
									defaultValue={selectedAccountNumber}
								>
									<div style={{ backgroundColor: theme.palette.background.default }}>
										{AccountData?.map((item, index) => {
											return (
												<MenuItem
													key={index}
													onClick={() => {
														setSelectedAccountNumber(String(item?.accountNumber));
														getCheckbooks({ accountNumber: String(item?.accountNumber) });
													}}
													sx={{
														borderBottom: `1px solid ${theme.palette.primary.main}`,
														borderTop: `1px solid ${theme.palette.primary.main}`,
														borderRadius: "10px",
														marginTop: "10px",
														padding: 16,
														backgroundColor: theme.palette.mode == "dark" ? theme.palette.grey[100] : theme.palette.grey[50],
														"&:hover": {
															borderBottom: `2px solid ${theme.palette.primary.main}`,
															borderTop: `2px solid ${theme.palette.primary.main}`,
															backgroundColor: theme.palette.mode == "dark" ? theme.palette.grey[100] : theme.palette.grey[50],
														}
													}}
													value={item.accountNumber}
												>
													<Grid
														container
														justifyContent={"center"}
														alignItems="Center"
														gap={"5px"}
														wrap="nowrap"
													>
														<Grid sx={{ height: "30px", width: "30px" }}>
															<img
																style={{ width: "100%", height: "100%" }}
																src={keshavarzi}
																alt={"icon"}
															/>
														</Grid>
														<Grid
															container
															direction={"column"}
															alignItems="flex-start"
															gap={"5px"}
														>
															<Typography
																variant="bodyMd"
																color={theme.palette.text["secondary"]}
															>
																{!item.isShared
																	? `${item.owners[0]?.firstName} ${item.owners[0]?.lastName
																	} ${t("curentAccountP")}`
																	: t("sharedAccountP")}
															</Typography>

															<Typography variant="bodyMd">{item.accountNumber}</Typography>
														</Grid>
													</Grid>
												</MenuItem>
											);
										})}
									</div>
								</SelectAdapter>
							</Grid>
							<Grid
								item
								xs={12}
								sm={12}
								md={6}
								lg={6}
								xl={6}
								sx={{
									order: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3 },
								}}
							>
								<SelectAdapter
									disabled={!selectedCheckbook}
									onChange={() => { }}
									label={t("sayadNo")}
									defaultValue={selectedChecksheet?.sayadNo.toString() ?? undefined}
									renderValue
									muiSelectProps={{ sx: { backgroundColor: "red" } }}
								>
									{/* <ChipWrapperForSelect>
											<ChipAdapter
												label={t('all')}
												onClick={(e) => {}}
											/>
											<ChipAdapter
												label={t('whiteCheck')}
												onClick={(e) => {}}
												checked
											/>
											<ChipAdapter
												label={t('issuedCheck')}
												onClick={(e) => {}}
											/>
										</ChipWrapperForSelect> */}
									<div className="h-full" style={{ backgroundColor: theme.palette.background.default }}>
										{sortedChequeSheets?.map((sheet) => {
											return (
												<MenuItem
													key={sheet.sayadNo}
													value={sheet.sayadNo}
													onClick={() => {
														setSelectedChecksheet(sheet);
													}}
													sx={{
														borderBottom: `1px solid ${theme.palette.primary.main}`,
														borderTop: `1px solid ${theme.palette.primary.main}`,
														borderRadius: "10px",
														marginTop: "10px",
														padding: 16,
														backgroundColor: theme.palette.mode == "dark" ? theme.palette.grey[100] : theme.palette.grey[50],
														"&:hover": {
															borderBottom: `2px solid ${theme.palette.primary.main}`,
															borderTop: `2px solid ${theme.palette.primary.main}`,
															backgroundColor: theme.palette.mode == "dark" ? theme.palette.grey[100] : theme.palette.grey[50],

														}
													}}
												>
													<Grid
														container
														flexDirection={"row"}
														flexWrap={"nowrap"}
													>
														<Grid
															container
															direction={"column"}
															justifyContent={"center"}
															spacing={"8px"}
															sx={{ padding: "5px" }}
															gap={"8px"}
														>
															<Typography
																variant="bodyMd"
																fontWeight={"bold"}
															>
																{t("sayadNumber")}:{sheet.sayadNo}
															</Typography>
															<Typography
																variant="bodyXs"
																fontWeight={"medium"}
															>
																{t("serieAndSerial")}: {sheet.chequeFrom}
																{/* | {sheet.chequeTo} */}
															</Typography>
															{sheet.isUsed && (
																<Box textAlign={"right"}>
																	<ChipsAdapter
																		label={t("issuedCheck")}
																		color="error"
																	/>
																</Box>
															)}
														</Grid>

													</Grid>
												</MenuItem>
											);
										})}
									</div>
								</SelectAdapter>
							</Grid>
							<Grid
								item
								xs={12}
								sm={12}
								md={6}
								lg={6}
								xl={6}
								sx={{
									order: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
								}}
							>
								<SelectAdapter
									disabled={!selectedAccountNumber}
									onChange={() => { }}
									label={t("checkbook")}
									defaultValue={selectedCheckbook ?? undefined}
									renderValue
								>
									<div style={{ backgroundColor: theme.palette.background.default }}>
										{checkbooks?.map((checkbook, index) => {
											return (
												<MenuItem
													key={index}
													value={checkbook.chequeTo}
													onClick={() => {
														const selectedCheckbook = {
															accountNumber: selectedAccountNumber,
															startChequeNo: checkbook.chequeFrom,
															endChequeNo: checkbook.chequeTo,
															pageNo: 1
														};
														setSelectedCheckbook(checkbook.chequeTo);
														getChecksheets(selectedCheckbook);
													}}
													sx={{
														borderBottom: `1px solid ${theme.palette.primary.main}`,
														borderTop: `1px solid ${theme.palette.primary.main}`,
														borderRadius: "10px",
														marginTop: "10px",
														padding: 16,
														backgroundColor: theme.palette.mode == "dark" ? theme.palette.grey[100] : theme.palette.grey[50],
														"&:hover": {
															borderBottom: `2px solid ${theme.palette.primary.main}`,
															borderTop: `2px solid ${theme.palette.primary.main}`,
															backgroundColor: theme.palette.mode == "dark" ? theme.palette.grey[100] : theme.palette.grey[50],

														}
													}}
												>

													<Grid
														container
														direction={"column"}
														justifyContent={"center"}
														spacing={"8px"}
														sx={{ padding: "16px" }}
														gap={"8px"}
													>
														<Typography
															variant="bodyMd"
															fontWeight={"bold"}
														>
															{t("checkbookNumber")}:{checkbook.chequeTo}
														</Typography>
														<Typography
															variant="bodyXs"
															fontWeight={"medium"}
														>
															{t("issueDate")}:{checkbook.issueDate}
														</Typography>
													</Grid>
												</MenuItem>
											);
										})}
									</div>
								</SelectAdapter>
							</Grid>
						</Grid>
					</Grid>

					<Grid>
						<ButtonAdapter
							variant="contained"
							size="medium"
							muiButtonProps={{ sx: { width: "100%", marginTop: "16px", minHeight: "48px" } }}
							forwardIcon
							onClick={() => handleNextStep()}
							disabled={!selectedChecksheet}
						>
							{t("continue")}
						</ButtonAdapter>
					</Grid>
				</Grid>
			</BoxAdapter >


			{/* {matches ? null : (
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
			)} */}
		</Grid >
	);
}
