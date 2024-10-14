import { Box, Typography } from '@mui/material';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();

	return (
		<>
			<Box padding={5}>
				<Typography variant="h1Md">Oops</Typography>
				<Typography variant="bodyLg">
					{isRouteErrorResponse(error) ? 'This page does not exist.' : 'An unexpected error occurred.'}
				</Typography>
			</Box>
		</>
	);
};

export default ErrorPage;
