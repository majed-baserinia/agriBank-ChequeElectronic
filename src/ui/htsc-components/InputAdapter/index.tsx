import { InputAdornment, TextField, useTheme } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

import { useFormatter } from 'ui/htsc-components/InputAdapter/userFormatter';
import { isInputTypeNumeric } from 'ui/htsc-components/InputAdapter/utils';
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
		endIcon,
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
	const format = useFormatter({ type, theme });
	const [internalEndIcon, setInternalEndIcon] = useState<ReactNode>(null);

	useEffect(() => {
		const defVal = format(defaultValue).formatted;

		setValue(defVal);
		if (defVal) {
			setShrink(true);
		}

		setInternalEndIcon(
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
			) : (
				endIcon
			)
		);
	}, [success, error, defaultValue, endIcon]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const result = format(event.target.value);
		const lengthDiff = result.formatted.length - result.original.length;

		const cursorPosition = event.target.selectionStart;

		// move the cursor if there are any changes
		requestAnimationFrame(() => {
			event.target.setSelectionRange(
				(cursorPosition as number) + lengthDiff,
				(cursorPosition as number) + lengthDiff
			);
		});

		setValue(result.formatted);
		onChange(type === 'card' || type === 'money' ? result.numeric : result.formatted);
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
			type={type === 'password' ? 'password' : 'text'}
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
				inputProps: {
					inputMode: isInputTypeNumeric(type) ? 'numeric' : undefined,
					className: `${isInputTypeNumeric(type) && theme.direction === 'rtl' ? 'text-right' : ''}`,
					...(isInputTypeNumeric(type) && theme.direction === 'rtl' ? { dir: 'ltr' } : {})
				},
				sx: {
					input: {
						color: theme.palette.grey[400]
					}
				},
				startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : null,
				endAdornment:
					error || success || endIcon ? (
						<InputAdornment position="end">{internalEndIcon}</InputAdornment>
					) : null,
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
