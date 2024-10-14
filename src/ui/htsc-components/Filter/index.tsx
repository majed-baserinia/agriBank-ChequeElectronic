import { Grid, MenuItem, Paper, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import filterIcon from 'assets/icon/filter.svg';
import ButtonAdapter from '../ButtonAdapter';
import ModalOrBottomSheet from '../ModalOrBottomSheet';
import SelectAdapter from '../SelectAdapter';
import SvgToIcon from '../SvgToIcon';
import ChipsAdapter from '../chipsAdapter';
import { Props } from './type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Filter<T extends Record<any, unknown>>(props: Props<T>) {
	const { data, filters, getFilteredData } = props;
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState<string[]>([]);
	const [filtersState, setFiltersState] = useState(filters);

	const handleSelectChange = (label: string, value: string) => {
		setFiltersState((prev) => {
			return prev.map((item) => {
				if (item.label === label) {
					// Create a new list with the updated selected state
					const newList = item.list.map((menuItem) => ({
						...menuItem,
						selected: menuItem.value === value
					}));

					// Return the updated filter item
					return {
						...item,
						list: newList
					};
				}
				return item;
			});
		});
	};

	const handleSubmitFilterButton = () => {
		const selectedItems = [];
		const filteredData = [];
		for (const filter of filtersState) {
			//get selected value
			const selectedItem = filter.list.find((item) => item.selected)?.value;

			//save selected items to show to the user in the input
			selectedItems.push(selectedItem!);

			//filter the values
			const newData = filter.filterFunction?.(data, selectedItem!);

			if (newData) {
				filteredData.push(newData);
			}
		}

		//get the shared data between the filters
		function intersection(arrays: T[][]) {
			if (arrays.length === 0) return [];
			return arrays.reduce((acc, array) => acc.filter((item) => array.includes(item)));
		}

		const finalData = intersection(filteredData);

		//pass data to parent
		getFilteredData(finalData);

		//set the filters name in the input
		setInputValue(selectedItems);
		setOpen(false);
	};

	return (
		<Grid>
			<Grid onClick={() => setOpen(!open)}>
				<Paper
					elevation={0}
					sx={{
						minWidth: '200px',
						display: 'flex',
						alignItems: 'center',
						padding: '4px',
						border: `1px solid ${theme.palette.grey[100]}`,
						borderRadius: '8px',
						backgroundColor: 'inherit'
					}}
					component="div"
				>
					<Grid
						container
						alignItems={'center'}
						gap={'4px'}
					>
						<SvgToIcon
							icon={filterIcon}
							alt="filter"
						/>
						<Typography variant="bodySm">فیلتر</Typography>
					</Grid>
					<Grid
						container
						alignItems={'center'}
						flexDirection={'row'}
						wrap="nowrap"
						gap={'4px'}
					>
						{inputValue.map((item) => {
							return (
								<ChipsAdapter
									key={item}
									label={item}
									onClick={() => {}}
									icon={<CloseIcon sx={{ width: '20px', height: '20px', margin: '0' }} />}
								/>
							);
						})}
					</Grid>
				</Paper>
			</Grid>
			<ModalOrBottomSheet
				title="فیلتر"
				breackpoint="sm"
				open={open}
				setOpen={setOpen}
			>
				<Grid
					container
					direction={'column'}
					gap={'16px'}
				>
					{filtersState.map((filter) => {
						return (
							<Grid
								key={filter.label}
								container
								direction={'column'}
								gap={'8px'}
							>
								<Typography variant="bodySm">{filter.filterTitle}</Typography>
								<SelectAdapter
									label={filter.label}
									onChange={(value) => {
										handleSelectChange(filter.label, value);
									}}
									renderValue
									defaultValue={filter.list.find((item) => item.selected)?.value}
								>
									{filter.list.map((item) => {
										return (
											<MenuItem
												key={item.key}
												value={item.value}
											>
												{item.key}
											</MenuItem>
										);
									})}
								</SelectAdapter>
							</Grid>
						);
					})}
					<ButtonAdapter
						muiButtonProps={{
							sx: { marginTop: '48px' }
						}}
						variant="contained"
						onClick={handleSubmitFilterButton}
					>
						efj
					</ButtonAdapter>
				</Grid>
			</ModalOrBottomSheet>
		</Grid>
	);
}
