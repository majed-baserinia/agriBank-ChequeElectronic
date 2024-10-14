import { OnDragEndResponder } from 'react-beautiful-dnd';

export type Item = {
	id: string;
	text: unknown;
};

export type DraggableListProps = {
	items: Item[];
	onDragEnd: OnDragEndResponder;
};

export type Props = {
	list: Item[] | [];
	getData: (list: Item[]) => void;
};
