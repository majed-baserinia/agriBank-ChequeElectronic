import { Grid, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import OverviewItem from "../CheckOverview/OverviewItem";

type Props = {
	checkData: {
		lockStatus?: string;
		sharedStatus?: string;
		settlementDate?: string;
		chequeStatus?: string;
		dueDate: string;
		checkType?: string;
		branchCode?: string;
	};
};
export default function NewCheckInfoAdvance(props: Props) {
	const { checkData } = props;
	const { lockStatus, sharedStatus, chequeStatus, settlementDate, dueDate, checkType, branchCode } =
		checkData;
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Grid
			sx={{ padding: "16px", border: `1px solid ${theme.palette.grey[50]}`, borderRadius: "16px" }}
		>
			<Grid
				container
				direction={"column"}
				gap={"16px"}
				sx={{ margin: "0 8px" }}
			>
				{lockStatus && (
					<OverviewItem
						title={t("lockStatus")}
						value={lockStatus}
					/>
				)}
				{sharedStatus ? (
					<OverviewItem
						title={t("sharedStatus")}
						value={sharedStatus}
					/>
				) : null}
				{settlementDate ? (
					<OverviewItem
						title={t("settlementDate")}
						value={settlementDate}
					/>
				) : null}
				{chequeStatus && (
					<OverviewItem
						title={t("checkStatus")}
						value={chequeStatus}
					/>
				)}
				<OverviewItem
					title={t("dueDate")}
					value={dueDate}
				/>
				{checkType && (
					<OverviewItem
						title={t("checkType")}
						value={checkType}
					/>
				)}

				{branchCode && (
					<OverviewItem
						title={t("branchCode")}
						value={branchCode}
					/>
				)}
			</Grid>
		</Grid>
	);
}
