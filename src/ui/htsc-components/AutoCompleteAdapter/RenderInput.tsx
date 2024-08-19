import { AutocompleteRenderInputParams, CircularProgress, TextField, useTheme } from '@mui/material';
import { RenderInputProps } from './types';

export default function RenderInput(props: {
	params: AutocompleteRenderInputParams;
	aditionalProps: RenderInputProps;
}) {
	const { aditionalProps, params } = props;
	const { error, label, isRequired, helperText, inputMode, loading, inputRef } = aditionalProps;
	const theme = useTheme();

	return (
		<TextField
			{...params}
			dir={theme.direction}
			error={error}
			helperText={helperText}
			type="text"
			inputRef={inputRef}
			label={
				<>
					{isRequired ? (
						<>
							{label}
							<span style={{ color: theme.palette.error.main }}> *</span>
						</>
					) : (
						label
					)}
				</>
			}
			InputProps={{
				onBlur: (e) => e.target.blur(),
				inputMode: inputMode,
				...params.InputProps,
				endAdornment: (
					<>
						{loading ? (
							<CircularProgress
								color="inherit"
								size={20}
							/>
						) : null}
						{params.InputProps.endAdornment}
					</>
				)
			}}
		/>
	);
}
