import CloseIcon from '@mui/icons-material/Close';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	PaperProps,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';
import { ReactNode } from 'react';
import Sheet from 'react-modal-sheet';

type Props = {
	breackpoint: 'md' | 'sm' | 'lg' | 'xs';
	children: ReactNode;
	snapPoints?: number[];
	ModalpaperProps?: PaperProps;
	open: boolean;
	setOpen: (value: boolean) => void;
	title: string;
};

export default function ModalOrBottomSheet(props: Props) {
	const { breackpoint, children, snapPoints = [450, 0], ModalpaperProps, open, setOpen, title } = props;
	const theme = useTheme();
	const isMatched = useMediaQuery(theme.breakpoints.down(breackpoint));

	return isMatched ? (
		<Sheet
			isOpen={open}
			onClose={() => setOpen(false)}
			snapPoints={snapPoints}
		>
			<Sheet.Container style={{ backgroundColor: theme.palette.background.paper, padding: '16px' }}>
				<Sheet.Header style={{ marginBottom: '16px' }}>
					<Typography
						variant="bodyLg"
						fontWeight={'bold'}
					>
						{title}
					</Typography>
				</Sheet.Header>
				<Sheet.Content>{children}</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop />
		</Sheet>
	) : (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			PaperProps={ModalpaperProps}
			fullWidth
		>
			<DialogTitle>
				<Grid
					container
					justifyContent={'space-between'}
					alignItems={'center'}
				>
					<Typography
						variant="bodyLg"
						fontWeight={'bold'}
					>
						{title}
					</Typography>
					<IconButton onClick={() => setOpen(false)}>
						<CloseIcon />
					</IconButton>
				</Grid>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
}
