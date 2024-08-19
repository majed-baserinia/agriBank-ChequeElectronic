import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
	Autocomplete,
	AutocompleteInputChangeReason,
	Button,
	Grid,
	Popper,
	Theme,
	useMediaQuery,
	useTheme
} from '@mui/material';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RenderInput from './RenderInput';
import { Props } from './types';

const generateGridStyle = (theme: Theme) => {
	return {
		position: 'absolute',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		zIndex: '9',
		padding: '16px',
		height: window.innerHeight + 'px',
		backgroundColor: theme.palette.background.paper
	};
};

// TODO: may need to add card format and functionality to edit card number
// there is already implemented in the chargeAccount repo

//also may need the icons for the card numbers
//this is just a refactored version of that one in the chargeAccount repo
export default function AutoCompleteAdapter<T extends Record<any, unknown>>(props: Props<T>) {
	const {
		options,
		label,
		error = false,
		helperText,
		loading = false,
		isRequired = false,
		hasConfirmButton = false,
		renderOption,
		inputMode = 'text',
		onChange,
		onInputChange,
		muiButtonProps,
		valueToShowToInput,
		isOptionEqualToValue
	} = props;

	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<string | T | null>(null);
	const [inputValue, setInputValue] = useState('');
	const inputRef = useRef();

	useEffect(() => {
		//logic for "go back" button on browser to prevent
		matches && window.addEventListener('popstate', handlePopState);

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, []);

	const handlePopState = (event: PopStateEvent) => {
		event.preventDefault();
		setOpen(false);
	};

	const onChangeHandler = (event: SyntheticEvent<Element, Event>, newValue: string | T | null) => {
		onChange(newValue);
		setValue(newValue);

		if (matches && !hasConfirmButton) {
			setOpen(false);
			history.back();
		} else {
			setOpen(false);
		}
	};

	const onInputChangeHandler = (event: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
		const target = event?.target as HTMLInputElement;
		if (reason === 'clear' || target?.value! === '') {
			setValue(null);
			onChange(null);
			setInputValue('');
			onInputChange('');
		} else {
			setInputValue(value);
			onInputChange(value);
		}
	};

	// read the docs in mui
	const getOptionLabel = (option: string | T) => {
		if (typeof option === 'string') {
			return option;
		}

		const { text } = valueToShowToInput(option);
		return text;
	};

	// read the docs in mui
	const isOptionEqualToValueFunction = (option: string | T, value: string | T) => {
		if (typeof option === 'string' || typeof value === 'string') {
			return option === value;
		} else {
			return isOptionEqualToValue(option, value);
		}
	};

	return (
		<Grid
			container
			flexDirection={'column'}
			justifyContent={'space-between'}
			sx={open && matches ? { ...generateGridStyle(theme) } : null}
		>
			<Autocomplete
				popupIcon={<KeyboardArrowDownIcon />}
				freeSolo
				disablePortal
				options={options ?? []}
				loading={loading}
				loadingText={t('loadingTextAutoComp')}
				noOptionsText=""
				open={open}
				value={value}
				inputValue={inputValue}
				onChange={onChangeHandler}
				onInputChange={onInputChangeHandler}
				getOptionLabel={getOptionLabel}
				isOptionEqualToValue={isOptionEqualToValueFunction}
				onOpen={() => {
					matches && history.pushState(true, 'inputOpen');
					setOpen(true);
				}}
				onClose={() => {
					!hasConfirmButton ? setOpen(false) : null;
				}}
				renderOption={renderOption}
				PopperComponent={(props) => (
					<Popper
						{...props}
						sx={{
							boxShadow: matches ? 0 : 3
						}}
					/>
				)}
				renderInput={(params) => (
					<RenderInput
						params={params}
						aditionalProps={{
							inputRef: inputRef,
							label: label,
							error: error,
							helperText: helperText,
							inputMode: inputMode,
							isRequired: isRequired,
							loading: loading
						}}
					/>
				)}
			/>
			<Grid>
				{matches && open && hasConfirmButton ? (
					<Button
						sx={{
							zIndex: '110010',
							width: '100%'
						}}
						onClick={() => {
							matches && history.back();
							setOpen(false);
						}}
						variant="contained"
						color="primary"
						{...muiButtonProps}
					>
						{t('confirm')}
					</Button>
				) : null}
			</Grid>
		</Grid>
	);
}
