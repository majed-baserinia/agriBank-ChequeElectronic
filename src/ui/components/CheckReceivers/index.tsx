import { Dialog, useMediaQuery, useTheme } from '@mui/material';
import { RecieverRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Sheet from 'react-modal-sheet';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import AddForm from './AddForm';
import List from './List';
import { CheckReceiversProps } from './type';

export default function CheckReceivers(props: CheckReceiversProps) {
	const { onRceiversChange, sayad, receivers } = props;
	const { t } = useTranslation();
	const theme = useTheme();
	const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
	const [open, setOpen] = useState(false);
	const [localReceivers, setLocalReceivers] = useState<RecieverRequest[]>([]);

	useEffect(() => {
		// fil the receivers
		if (receivers) {
			setLocalReceivers(receivers);
		}
	}, []);

	useEffect(() => {
		onRceiversChange(localReceivers);
	}, [localReceivers]);

	return (
		<>
			<ButtonAdapter
				variant="outlined"
				size="medium"
				muiButtonProps={{ sx: { width: '100%' } }}
				onClick={() => setOpen(true)}
			>
				{t('add')}
			</ButtonAdapter>

			<List
				receivers={localReceivers}
				setReceivers={setLocalReceivers}
			/>

			{isDownSm ? (
				<Sheet
					isOpen={open}
					onClose={() => setOpen(false)}
					snapPoints={[450, 0]}
				>
					<Sheet.Container>
						<Sheet.Header />
						<Sheet.Content>
							<AddForm
								sayad={sayad}
								setOpen={setOpen}
								setReceivers={setLocalReceivers}
							/>
						</Sheet.Content>
					</Sheet.Container>
					<Sheet.Backdrop />
				</Sheet>
			) : (
				<Dialog
					open={open}
					onClose={() => setOpen(false)}
				>
					<AddForm
						sayad={sayad}
						setOpen={setOpen}
						setReceivers={setLocalReceivers}
					/>
				</Dialog>
			)}
		</>
	);
}
