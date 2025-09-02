import { Grid, useMediaQuery, useTheme } from "@mui/material";
import useChakavakGetEChequeFields from "business/hooks/cheque/ChakavakGetEChequeFields/useChakavakGetEChequeFields";
import useChakavakUnLockCheque from "business/hooks/cheque/ChakavakUnLockCheque/useChakavakUnLockCheque";
import { pushAlert } from "business/stores/AppAlertsStore";
import { useHandedOversData } from "business/stores/handedOverChecks/useHandedOversStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { checkActionsMenuList } from "ui/components/CheckListComps/cartable/BottomSheetActionButton";
import PersonsList from "ui/components/CheckOverview/PersonsList";
import Menu from "ui/components/Menu";
import NewCheckInfoAdvance from "ui/components/NewCheckInfoAdvance";
import NewCheckInfoBasics from "ui/components/NewCheckInfoBasics";

import { useLoadingHandler } from "@agribank/ui/components/Loader";
import BoxAdapter from "ui/htsc-components/BoxAdapter";
import ButtonAdapter from "ui/htsc-components/ButtonAdapter";
import { paths } from "ui/route-config/paths";

export default function HandedOverDetails() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	const { data: overviewData, mutate: getCheckDetails, isLoading } = useChakavakGetEChequeFields();
	const { mutate: unlock, isLoading: loadingUnlock } = useChakavakUnLockCheque();
	const { detailsPage } = useHandedOversData((store) => store);

	useEffect(() => {
		if (detailsPage?.check) {
			getCheckDetails({
				CustomerNo: detailsPage?.check.customerNumber,
				Id: detailsPage?.check.clearId
			});
		} else {
			pushAlert({
				type: "error",
				messageText: t("somethingIsWrong"),
				hasConfirmAction: true,
				actions: {
					onCloseModal: () => navigate(paths.Home),
					onConfirm: () => navigate(paths.Home)
				}
			});
		}
	}, []);

	const submitHandler = () => {
		unlock(
			{ CustomerNo: detailsPage!.check.customerNumber, Id: detailsPage!.check.clearId },
			{
				onError: (err) => {
					pushAlert({
						type: "error",
						messageText: err.detail,
						hasConfirmAction: true
					});
				},
				onSuccess: (res) => {
					pushAlert({
						type: "success",
						messageText: res.message,
						hasConfirmAction: true,
						actions: {
							onCloseModal: () => navigate(paths.Home),
							onConfirm: () => navigate(paths.Home)
						}
					});
				}
			}
		);
	};
	useLoadingHandler(isLoading || loadingUnlock);

	return (
		<Grid
			container
			sx={{ padding: matches ? "0" : "64px 0" }}
			justifyContent={"center"}
			gap={"24px"}
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
							minWidth: "25%",
							borderRadius: matches ? 0 : "32px",
							padding: "16px"
						}
					}}
				>
					<Grid
						minHeight={matches ? "calc(100vh - 32px)" : "calc(100vh - 192px)"}
						container
						direction={"column"}
						justifyContent={"space-between"}
						wrap="nowrap"
					>
						<Grid
							container
							direction={"column"}
							gap={"8px"}
						>
							{overviewData ? (
								<NewCheckInfoBasics
									hasTitle
									checkData={{
										amount: overviewData.generalInfo.amount.toString(),
										description: overviewData.generalInfo.descDeposit,
										date: overviewData.generalInfo.chqDate,
										sayad: overviewData.generalInfo.sayad.toString(),
										//reason: overviewData.generalInfo.,
										serie: overviewData.generalInfo.seri,
										serial: overviewData.generalInfo.serial
									}}
								/>
							) : null}
							{detailsPage && overviewData ? (
								<NewCheckInfoAdvance
									checkData={{
										branchCode: detailsPage.check.bankBranch,
										chequeStatus: detailsPage.check.chqStatusDesc,
										dueDate: detailsPage.check.chequeDate
										//sharedStatus: detailsPage?.check.sharedDescription!
									}}
								/>
							) : null}
							{overviewData ? (
								<PersonsList
									recievers={[
										{
											customerTypeDescription: overviewData.creditorInfo.creditorOwnerType,
											name: `${overviewData.creditorInfo.creditorFirstName} ${overviewData?.creditorInfo.creditorLastName}`,
											nationalNo: overviewData.creditorInfo.creditorIdentifier,
											shahabNo: overviewData.creditorInfo.creditorShahabID
										}
									]}
									signers={[
										{
											groupNumber: "",
											withdrawalGroups: [
												{
													customerNumber: Number(overviewData.debtorInfo.debtorIdentifier),
													name: overviewData.debtorInfo.debtorName
												}
											]
										}
									]}
								/>
							) : null}
						</Grid>

						<Grid container>
							<ButtonAdapter
								variant="outlined"
								size="medium"
								muiButtonProps={{ sx: { width: "100%", marginTop: "16px" } }}
								forwardIcon
								onClick={() => submitHandler()}
							>
								{t("cancellationOfCashability")}
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
						<Menu list={checkActionsMenuList} />
					</BoxAdapter>
				</Grid>
			)}
		</Grid>
	);
}
