import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
	FormControl,
	FormHelperText,
	Grid,
	InputAdornment,
	InputLabel,
	Select,
	SelectChangeEvent,
	useMediaQuery,
	useTheme
} from '@mui/material';
import { ReactElement, ReactNode, SyntheticEvent, useEffect, useState } from 'react';

import { Props } from './type';

export default function SelectAdapter(props: Props) {
	const {
		onChange,
		label,
		error,
		helperText,
		disabled,
		icon,
		children,
		defaultValue = '',
		muiSelectProps,
		size = 'medium',
		renderValue = false,
		isRequired = false
	} = props;
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	const [selectedValue, setSelectedValue] = useState<string>(defaultValue);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setSelectedValue(defaultValue);
	}, [defaultValue]);

	//const handleChange = (event:ChangeEvent<{ value: unknown}>) => {

	const handleChange = (e: SelectChangeEvent<unknown>, child: ReactNode) => {
		if ((child as ReactElement).type == 'div') {
			setOpen(true);
		} else {
			setSelectedValue(e.target.value as string);
			onChange(e.target.value as string);
		}
	};

	const handleClickedItem = (e: SyntheticEvent<Element, Event>) => {
		//check if the user is clicking on buttons  inside the select
		const clickedItemTagName = e.currentTarget.tagName.toLowerCase();
		const clickedItemClassName = e.currentTarget.className;

		if (clickedItemTagName === 'div' && clickedItemClassName === 'clickedNotClose') {
			setOpen(true);
		} else {
			setOpen(false);
		}
	};

	const gridStyle = {
		position: 'absolute',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		zIndex: '9',
		padding: '16px',
		height: window.innerHeight + 'px',
		width: '100%',
		backgroundColor: theme.palette.background.paper
	};

	const menuStyle = {
		'& .MuiMenu-list': {
			backgroundColor: theme.palette.background.paper,
			height: '100%',
			minWidth: '100%',
			boxShadow: 'none'
		},
		'& .MuiMenu-paper': {
			backgroundColor: theme.palette.background.paper,
			height: '100%',
			minWidth: '100%',
			boxShadow: 'none'
		}
	};

	return (
		<Grid
			container
			flexDirection={'column'}
			justifyContent={'space-between'}
			sx={{ ...(open && matches ? gridStyle : {}), transition: 'width 0.2s ease-out' }}
		>
			<FormControl
				fullWidth
				size={size}
			>
				<InputLabel id="label">{label}</InputLabel>
				<Select
					// we need one more rerender to apply the new styles correctly
					// the key props is for forcing a rerender
					key={`${open}-${matches}`}
					size={size}
					labelId="label"
					{...muiSelectProps}
					disabled={disabled}
					dir={theme.direction}
					open={open}
					onOpen={() => setOpen(true)}
					onClose={(e) => handleClickedItem(e)}
					value={selectedValue}
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
					onChange={(e, child) => handleChange(e, child)}
					sx={{ '& .MuiSvgIcon-root': { color: theme.palette.grey[400] } }}
					IconComponent={KeyboardArrowDownIcon}
					error={error}
					startAdornment={icon ? <InputAdornment position="start">{icon}</InputAdornment> : undefined}
					inputProps={{
						renderValue: renderValue ? (option: string) => option : undefined
					}}
					MenuProps={{
						dir: theme.direction,
						sx: matches ? menuStyle : null,
						PaperProps: {
							style: { maxWidth: '200px', overflowX: 'auto', padding: !matches ? '0 8px' : 'inherit' }
						}
					}}
				>
					{children}
				</Select>
				<FormHelperText error={error}>{helperText}</FormHelperText>
			</FormControl>
		</Grid>
	);
}
