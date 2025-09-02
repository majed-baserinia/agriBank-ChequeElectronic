import { Box, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();

	return (
		<>
			<Box padding={5}>
				<Typography variant="h1Md">خطا</Typography>
				<Typography variant="bodyLg">
					{isRouteErrorResponse(error)
						? "This page does not exist."
						: "در ارتباط مشکلی به وجود آمده، لطفا مجدد اقدام فرمایید."}
				</Typography>
			</Box>
		</>
	);
};

export default ErrorPage;
