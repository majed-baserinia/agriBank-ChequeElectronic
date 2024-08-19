import { InputAdornment, TextField, useTheme } from '@mui/material';
import { formatToCart, formatToMoney, persianToEnglishDigits } from 'common/utils/formatInput';
import { ReactNode, useEffect, useState } from 'react';

import alertIcon from '../../../assets/icon/input/alertIcon.svg';
import sucIcon from '../../../assets/icon/input/successIcon.svg';
import SvgToIcon from '../SvgToIcon';
import { InputAdapterProps } from './type';

const heightSizeList = {
	sm: '40px',
	md: '48px',
	lg: '56px'
};

export default function InputAdapter(props: InputAdapterProps) {
	const {
		placeholder,
		disabled = false,
		sx,
		isRequired = false,
		label,
		icon,
		type = 'text',
		defaultValue = '',
		onChange,
		muiTextFieldProps,
		inputProps,
		error = false,
		success = false,
		size = 'md',
		helperText,
		focused
	} = props;

	const theme = useTheme();
	const [value, setValue] = useState('');
	const [shrink, setShrink] = useState(defaultValue ? true : false);
	const [endIcon, setEndIcon] = useState<ReactNode>(null);

	useEffect(() => {
		const defVal =
			type == 'cart' ? formatToCart(defaultValue) : type == 'money' ? formatToMoney(defaultValue) : defaultValue;

		setValue(defVal);
		if (defVal) {
			setShrink(true);
		}
		setEndIcon(
			success ? (
				<SvgToIcon
					icon={sucIcon}
					alt="success"
				/>
			) : error ? (
				<SvgToIcon
					icon={alertIcon}
					alt="error"
				/>
			) : null
		);
	}, [success, error, defaultValue]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const originalValue = persianToEnglishDigits(event.target.value);

		// Remove non-numeric characters
		const numericValue = originalValue.replace(/[^0-9]/g, '');

		// Save the cursor position before modifying the input value
		const cursorPosition = event.target.selectionStart;

		if (type === 'text' || type == 'password') {
			setValue(originalValue);
			onChange(originalValue);
		}
		if (type === 'number') {
			setValue(numericValue);
			onChange(numericValue);
		}
		if (type == 'cart' || type == 'money') {
			// Format input as 4 digits separated by "-"
			const formattedInput = type == 'cart' ? formatToCart(numericValue) : formatToMoney(numericValue);

			// Calculate the difference in length between the original and formatted values
			const lengthDiff = formattedInput.length - originalValue.length;

			setValue(formattedInput);
			onChange(formattedInput.replaceAll('-', '').replaceAll(',', ''));

			// Set the cursor position back to the saved position
			requestAnimationFrame(() => {
				event.target.setSelectionRange(
					(cursorPosition as number) + lengthDiff,
					(cursorPosition as number) + lengthDiff
				);
			});
		}
	};

	const labelStyle = () => {
		const Y = {
			sm: '8px',
			md: '12px',
			lg: '15px'
		};

		if (shrink) return;

		const directionOffsetX = icon ? (theme.direction === 'rtl' ? -40 : 40) : theme.direction === 'rtl' ? -15 : 15;

		return { transform: `translate(${directionOffsetX}px, ${Y[size]})` };
	};

	return (
		<TextField
			inputRef={(input) => input && focused && input.focus()}
			color={success ? 'success' : undefined}
			variant="outlined"
			dir={theme.direction}
			fullWidth
			autoComplete="off"
			size="medium"
			onFocus={() => setShrink(true)}
			onBlur={() => (value ? setShrink(true) : setShrink(false))}
			disabled={disabled}
			type={type == 'password' ? 'password' : 'text'}
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
				'& .MuiOutlinedInput-root': {
					height: heightSizeList[size]
				},
				'& .MuiOutlinedInput-root fieldset': {
					borderWidth: success || error ? '2px' : '1px',
					borderColor: success ? theme.palette.success[400] : null
				},
				...sx
			}}
			error={error}
			helperText={helperText}
			InputProps={{
				inputMode: type == 'cart' || type == 'money' || type == 'number' ? 'numeric' : undefined,
				dir: theme.direction,
				sx: { input: { color: theme.palette.grey[400] } },
				startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : null,
				endAdornment: error || success ? <InputAdornment position="end">{endIcon}</InputAdornment> : null,
				...inputProps
			}}
			InputLabelProps={{
				size: 'small',
				shrink: shrink,
				style: labelStyle()
			}}
			{...muiTextFieldProps}
		/>
	);
}
