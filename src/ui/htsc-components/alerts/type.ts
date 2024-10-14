import { ReactNode } from 'react';

export type AppAlert = {
	type: 'success' | 'info' | 'warning' | 'error';
	messageText?: string;
	hasConfirmAction?: boolean;
	confirmButtonText?: string;
	hasContinueAction?: boolean;
	hasRefuseAction?: boolean;
	actions?: AlertActions;
	overrideActions?: ReactNode;
};

export type props = {
	type: 'success' | 'info' | 'warning' | 'error';
};

type AlertActions = {
	onRefuse?: () => void;
	onCloseModal?: () => void;
	onConfirm?: () => void;
	onContinue?: () => void;
};
