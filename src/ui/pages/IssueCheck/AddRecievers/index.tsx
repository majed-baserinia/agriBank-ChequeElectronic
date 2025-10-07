import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';

import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import { pushAlert } from 'business/stores/AppAlertsStore';
import { useIssueCheckWizardData } from 'business/stores/issueCheck/useIssueCheckWizardData';
import { useEffect } from 'react';
import CheckReceivers from 'ui/components/CheckReceivers';
import { paths } from 'ui/route-config/paths';
import { menuList } from '../../HomePage/menuList';

export default function AddReceivers() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { setNewDataToWizard, checkInfoPage, selectCheckPage, addReceiverPage } = useIssueCheckWizardData((store) => store);

	useEffect(() => {
		if (!selectCheckPage) {
			pushAlert({
				type: 'error',
				hasConfirmAction: true,
				messageText: t('failedToGetDateFromStoreText'),
				actions: { onConfirm: () => navigate(paths.IssueCheck.SelectAccountPath) }
			});
		}

		if (!checkInfoPage) {
			pushAlert({
				type: 'error',
				hasConfirmAction: true,
				messageText: t('failedToGetDateFromStoreText'),
				actions: { onConfirm: () => navigate(paths.IssueCheck.CheckInfoPath) }
			});
		}
	}, []);

	const handleSubmitToNextLevel = () => {
		const currentData: any = useIssueCheckWizardData.getState();
		if (currentData.accountType === "IndividualCheque")
			navigate(paths.IssueCheck.ChequeReceiptPreview);
		if (currentData.accountType === "CorporateCheque")
			navigate(paths.IssueCheck.SignatureGroupPath);
	};

	return (
		<div className='h-full' dir={theme.direction}>
			<div className='h-full'>
				<BoxAdapter fullWidth={matches}>
					<div className='h-full'>
						{/* {!matches ? (
							// TODO: check if selected compony or homself acocunt and add one more step if it is compony
							<Stepper
								list={[
									t('selectCheck'),
									t('checkInfo'),
									t('recivers'),
									t('issueSignature'),
									t('end')
								]}
								active={2}
							/>
						) : null} */}
						<Typography variant="bodyMd" marginBottom={20}>{t('addReceiversText')}</Typography>
						{selectCheckPage && (
							<CheckReceivers
								sayad={selectCheckPage.checkData.sayadNo}
								onRceiversChange={(receiversList) =>
									setNewDataToWizard({
										addReceiverPage: { ...addReceiverPage, receivers: receiversList }
									})
								}
								receivers={addReceiverPage?.receivers}
							/>
						)}
					</div>
					<ButtonAdapter
						variant="contained"
						size="medium"
						disabled={addReceiverPage?.receivers?.length == 0}
						muiButtonProps={{ sx: { width: '100%', marginTop: '16px', marginBottom: '16px', minHeight: "48px" } }}
						forwardIcon
						onClick={() => handleSubmitToNextLevel()}
					>
						{t('continue')}
					</ButtonAdapter>

				</BoxAdapter>

			</div>

			{/* {matches ? null : (
				<Grid
					item
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<Menu
							divider={false}
							list={menuList.management}
						/>
						<Menu
							divider={false}
							list={menuList.services}
						/>
					</BoxAdapter>
				</Grid>
			)} */}
		</div>
	);
}
