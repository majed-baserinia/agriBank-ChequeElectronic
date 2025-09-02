import { Grid, useMediaQuery, useTheme } from "@mui/material";
import useFirstPageViewGenerator from "business/hooks/cheque/transferCheck/useFirstPageViewGenerator";

import { useLoadingHandler } from "@agribank/ui/components/Loader";

export default function CheckNewInfo() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	const { view, isLoading } = useFirstPageViewGenerator();

	useLoadingHandler(isLoading);

	return (
		<Grid
			container
			// sx={{ padding: matches ? "0" : "64px 0" }}
			justifyContent={"center"}
			gap={"24px"}
			dir={theme.direction}
			flexDirection={"column"}
		>
			<Grid
				item
				xs={12}
				md={12}
			>
				{view}
			</Grid>

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
			{/* <Loader showLoader={isLoading} /> */}
		</Grid>
	);
}
