import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Grid, ListItem, ListItemText, Typography } from '@mui/material';
import { useState } from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { StrictModeDroppable } from './StrictModeDroppable';
import { Props } from './type';

export default function DraggableList(props: Props) {
	const { list, getData } = props;
	const [items, setItems] = useState(list);
	const { t, i18n } = useTranslation();

	const onDragEnd = ({ destination, source }: DropResult) => {
		// dropped outside the list
		if (!destination) return;

		const newItems = reorder(items, source.index, destination.index);
		setItems(newItems);
		getData(newItems);
	};

	const mapNumbers: { [key: number]: string } = {
		0: t('first'),
		1: t('second'),
		2: t('third'),
		3: t('fourth'),
		4: t('fifth'),
		5: t('sixth'),
		6: t('seventh'),
		7: t('eighth'),
		8: t('ninth'),
		9: t('tenth'),
		10: t('eleventh'),
		11: t('twelfth'),
		12: t('thirteenth'),
		13: t('fourteenth'),
		14: t('fifteenth'),
		15: t('sixteenth'),
		16: t('seventeenth'),
		17: t('eighteenth'),
		18: t('nineteenth'),
		19: t('twentieth')
		// Add more entries if needed
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<StrictModeDroppable droppableId="droppable-list">
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{items.map((item, index) => (
							<Draggable
								draggableId={item.id.toString()}
								index={index}
								key={item.text as string}
							>
								{(provided, _) => (
									<ListItem
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<ListItemText
											primary={
												<Grid
													container
													direction={i18n.dir() === 'rtl' ? 'row' : 'row-reverse'}
													justifyContent={'start'}
													gap={'6px'}
												>
													<span>
														<Typography
															variant="bodyXs"
															fontWeight={'medium'}
														>
															{t('signatory')}
														</Typography>{' '}
													</span>
													<span>
														<Typography
															variant="bodyXs"
															fontWeight={'medium'}
														>
															{mapNumbers[index]}
														</Typography>{' '}
													</span>
												</Grid>
											}
											secondary={
												<Grid
													container
													gap={'8px'}
												>
													<DragHandleIcon />
													<Typography variant="bodySm">{item.text as string}</Typography>
												</Grid>
											}
										/>
									</ListItem>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</StrictModeDroppable>
		</DragDropContext>
	);
}

const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};
