import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
	icon?: ReactNode;
	title: string;
	subtitle?: string;
	miniSubtitle?: string;
	routeTo?: string;
	setOpen?: any;
	onClick?: () => void;
}

export default function MenuItem(props: Props) {
	const { onClick, icon, title, subtitle, routeTo, miniSubtitle, setOpen } = props;
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleClick = () => {
		setOpen && setOpen(true);
		onClick?.();
		if (routeTo) {
			navigate(routeTo);
		}
	};

	return (
		<Grid
			container
			justifyContent={"space-between"}
			alignItems={"center"}
			minWidth={"290px"}
			sx={{ padding: matches ? "16px 0" : "24px 0", cursor: "pointer", overflow: "hidden" }}
			onClick={handleClick}
		>
			<Grid>
				<Grid
					container
					gap={"8px"}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<Grid item> {icon ? icon : null}</Grid>
					<Grid>
						<Typography
							variant="bodyMd"
							fontWeight={"medium"}
							noWrap
						>
							{t(title, title)}
						</Typography>
						{subtitle ? (
							<Typography
								variant="bodySm"
								fontWeight={"medium"}
								sx={{ color: theme.palette.text.secondary, marginTop: "8px" }}
							>
								{t(subtitle, subtitle)}
							</Typography>
						) : null}
						{miniSubtitle ? (
							<Typography
								variant="bodySm"
								fontWeight={"medium"}
								sx={{ color: theme.palette.text.secondary, marginTop: "8px" }}
							>
								{t(miniSubtitle, miniSubtitle)}
							</Typography>
						) : null}
					</Grid>
				</Grid>
			</Grid>
			<Grid>{theme.direction == "rtl" ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}</Grid>
		</Grid>
	);
}
