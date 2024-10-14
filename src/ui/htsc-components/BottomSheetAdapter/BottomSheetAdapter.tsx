import { useTheme } from '@mui/material';
import Sheet from 'react-modal-sheet';
import { Props } from './type';

export default function BottomSheetAdapter(props: Props) {
	const { open, setOpen, children, snapPoints = [450, 0] } = props;
	const theme = useTheme();

	return (
		<Sheet
			isOpen={open}
			onClose={() => setOpen(false)}
			snapPoints={snapPoints}
		>
			<Sheet.Container
				style={{
					backgroundColor: theme.palette.background.paper
				}}
			>
				<Sheet.Header />
				<Sheet.Content>{children}</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop />
		</Sheet>
	);
}
