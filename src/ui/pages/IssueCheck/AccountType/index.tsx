import { useLoadingHandler } from "@agribank/ui/components/Loader";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import useGetAllRelatedCustomers from "business/hooks/cheque/checklist/useGetAllRelatedCustomers";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Menu from "ui/components/Menu";
import BottomSheetAdapter from "ui/htsc-components/BottomSheetAdapter/BottomSheetAdapter";
import BoxAdapter from "ui/htsc-components/BoxAdapter";
import { menuList } from "./menuList";
import { paths } from 'ui/route-config/paths';
import { useIssueCheckWizardData } from "business/stores/issueCheck/useIssueCheckWizardData";


export default function AccountType() {
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	const [open, setOpen] = useState(false);
	const { data: relatedCustomers, isLoading: isLoadingRelatedCustomers } = useGetAllRelatedCustomers("ChakadIssueCheque");

	const CompanyMenuList = relatedCustomers?.map((item, index) => {
		return {
			id: index,
			title: item.fullName,
			onClick: () => {
				console.log(item)
				const setNewDataToWizard = useIssueCheckWizardData.getState().setNewDataToWizard;
				setNewDataToWizard({ CorporateChequeCompany: item });
			},
			routeTo: paths.IssueCheck.SelectAccountPath
		}
	});

	useLoadingHandler(isLoadingRelatedCustomers);

	return (
		<Grid
			container
			// sx={{ padding: matches ? "0" : "0 0" }}
			height={"100%"}
			width={"100%"}
			display={"flex"}
			justifyContent={"center"}
			gap={"24x"}
			dir={theme.direction}
		>
			<BoxAdapter fullWidth>
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
						sx={{ marginBottom: "0px" }}
					>
						{t("PersonalTypeSelect")}
					</Typography>
				</Grid>
				<Grid
					container
					dir={theme.direction}
					display={"flex"}
					direction={"column"}
					width={"100%"}
					marginTop={30}
				>
					<Menu
						list={menuList.personalTypes}
						setOpen={setOpen}
					// menuTitle={'menuTitleServices'}
					/>
				</Grid>
			</BoxAdapter>
			{!isLoadingRelatedCustomers && (
				<BottomSheetAdapter
					open={open}
					setOpen={setOpen}
				// snapPoints={[450, 0]}
				>
					<Grid
						sx={{ padding: "16px" }}
						container
						justifyContent={"center"}
						direction={"column"}
						gap={"18px"}
					>
						<Typography variant="bodyLg">{t("selectACompanyNameSigner")}:</Typography>
						<Menu list={CompanyMenuList ?? []} />
					</Grid>
				</BottomSheetAdapter>
			)}
		</Grid>
	);
}
