import { Box, Grid, MenuItem, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Menu from "ui/components/Menu";

import BoxAdapter from "ui/htsc-components/BoxAdapter";
import Stepper from "ui/htsc-components/Stepper";

import { menuList } from "./menuList";

export default function PersonalType() {
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));

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
					<Typography
						variant="bodyMd"
						sx={{ marginBottom: "16px" }}
					>
						{t("PersonalTypeSelect")}
					</Typography>

				</Grid>
				<Grid
					container
					dir={theme.direction}
					display={"flex"}
					direction={'column'}
					width={"100%"}
					marginTop={50}
				>
					<Menu
						list={menuList.personalTypes}
					// menuTitle={'menuTitleServices'}
					/>
				</Grid>

			</BoxAdapter >


		</Grid >
	);
}
