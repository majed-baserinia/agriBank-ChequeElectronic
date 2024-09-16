import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Typography,
	useTheme
} from '@mui/material';
import { clearAlert, useAlert } from 'business/stores/AppAlertsStore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ButtonAdapter from '../ButtonAdapter';
import AlertIcon from './alertIcon';
import { AppAlert } from './type';

export default function AppAlerts() {
	const { alerts } = useAlert();
	const { t } = useTranslation();
	const theme = useTheme();
	const [open, setOpen] = useState(true);
	const [localAlerts, setLocalAlerts] = useState<AppAlert[]>([]);
	const capturedAlert = localAlerts[0];

	useEffect(() => {
		setLocalAlerts([...alerts]);
		if (alerts.length) {
			setOpen(true);
		}
	}, [alerts]);

	const clearAlers = () => {
		clearAlert();
		setLocalAlerts([]);
	};

	const handleClose = () => {
		setOpen(false);
		clearAlers();
		capturedAlert?.actions?.onCloseModal?.();
	};

	return localAlerts.length > 0 ? (
		<Dialog
			onClose={(e, reason) => handleClose()}
			open={open}
			PaperProps={{
				sx: { padding: '32px', borderRadius: '24px' }
			}}
			maxWidth={'xs'}
			fullWidth
			sx={{ zIndex: 9999999999999999 }}
		>
			<Grid
				container
				justifyContent={'center'}
				alignItems={'center'}
			>
				<AlertIcon type={capturedAlert.type} />
			</Grid>
			<DialogTitle sx={{ margin: 'auto' }}>
				<Typography
					variant="bodyLg"
					fontWeight={'bold'}
				>
					{t(capturedAlert.type)}
				</Typography>
			</DialogTitle>

			<DialogContent sx={{ margin: 'auto' }}>
				<DialogContentText>
					<Typography variant="bodySm">{capturedAlert?.messageText}</Typography>
				</DialogContentText>
			</DialogContent>

			<DialogActions sx={{ justifyContent: 'center' }}>
				{capturedAlert.overrideActions ? (
					capturedAlert.overrideActions
				) : (
					<>
						{capturedAlert?.hasConfirmAction ? (
							<ButtonAdapter
								onClick={() => {
									setOpen(false);
									clearAlers();
									capturedAlert?.actions?.onConfirm?.();
								}}
								variant={'contained'}
							>
								{capturedAlert.confirmButtonText ? capturedAlert.confirmButtonText : t('IUnderstand')}
							</ButtonAdapter>
						) : null}
						{capturedAlert?.hasContinueAction ? (
							<ButtonAdapter
								onClick={() => {
									setOpen(false);
									clearAlers();
									capturedAlert.actions?.onContinue?.();
								}}
								variant={'contained'}
							>
								{t('continue')}
							</ButtonAdapter>
						) : null}
						{capturedAlert?.hasRefuseAction ? (
							<ButtonAdapter
								onClick={() => {
									setOpen(false);
									clearAlers();
									capturedAlert.actions?.onRefuse?.();
								}}
								variant={'outlined'}
							>
								{t('refuse')}
							</ButtonAdapter>
						) : null}
					</>
				)}
			</DialogActions>
		</Dialog>
	) : undefined;
}
