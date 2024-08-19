import { TextField, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

import { TextareaAdapterProps } from "./type";
import { use } from 'i18next';

export default function TextareaAdapter(props: TextareaAdapterProps) {
	const {
		placeholder,
		disabled = false,
		sx,
		isRequired = false,
		label,
		defaultValue = '',
		onChange,
		muiTextFieldProps,
		inputProps,
		error = false,
		success = false,
		helperText,
        rows = 4
	} = props;

	const theme = useTheme();
	const [value, setValue] = useState(defaultValue);
	const [shrink, setShrink] = useState(defaultValue ? true : false);


	useEffect(() => {
		if(defaultValue){

			setValue(defaultValue);
			setShrink(true)
		}
	}, [defaultValue]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		onChange(event.target.value);
	};

	return (
		<TextField
			multiline
			rows={rows}
			color={success ? 'success' : undefined}
			variant="outlined"
			dir={theme.direction}
			fullWidth
			autoComplete="off"
			size="medium"
			onFocus={() => setShrink(true)}
			onBlur={() => (value ? setShrink(true) : setShrink(false))}
			disabled={disabled}
			type={'text'}
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
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
			sx={{
				'& .MuiOutlinedInput-root fieldset': {
					borderWidth: success || error ? '2px' : '1px',
					borderColor: success ? theme.palette.success[400] : null
				},
				...sx
			}}
			error={error}
			helperText={helperText}
			InputProps={{
				dir: theme.direction,
				sx: { input: { color: theme.palette.grey[200] } },

				...inputProps
			}}
			InputLabelProps={{
				size: 'small',
				shrink: shrink
			}}
			{...muiTextFieldProps}
		/>
	);
}
