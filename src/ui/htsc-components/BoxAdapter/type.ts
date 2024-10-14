import { PaperProps } from '@mui/material';
import { ReactNode } from 'react';

export type Props = {
	children: ReactNode | ReactNode[];
	fullWidth?: boolean;
	muiPaperProps?: PaperProps;
};
