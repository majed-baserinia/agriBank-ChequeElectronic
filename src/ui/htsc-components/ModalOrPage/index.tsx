import { Dialog, Grid, PaperProps, useMediaQuery, useTheme } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction } from 'react';

type Props = {
	breackpoint: 'md' | 'sm' | 'lg' | 'xs';
	children: ReactNode;
	ModalpaperProps?: PaperProps;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ModalOrPage(props: Props) {
	const { breackpoint, children, ModalpaperProps, open, setOpen } = props;
	const theme = useTheme();
	const isMatched = useMediaQuery(theme.breakpoints.down(breackpoint));

	const gridStyle = {
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

	return isMatched ? (
		<Grid sx={isMatched ? { ...gridStyle } : null}>{children}</Grid>
	) : (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			PaperProps={ModalpaperProps}
		>
			{children}
		</Dialog>
	);
}
