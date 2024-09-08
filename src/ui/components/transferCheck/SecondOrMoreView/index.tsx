import { Grid, RadioGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
import useRejectTransferChequeInitiate from 'business/hooks/cheque/transferCheck/useRejectTransferChequeInitiate';
import useTransferChequeInitiate from 'business/hooks/cheque/transferCheck/useTransferChequeInitiate';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { InquiryTransferStatusRespone } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusResponse';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PersonsList from 'ui/components/CheckOverview/PersonsList';
import CheckOverViewBox from 'ui/components/CheckOverviewBox';
 
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import RadioButtonAdapter from 'ui/htsc-components/RadioButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';

export default function SecondOrMoreView({ checkData }: { checkData: InquiryTransferStatusRespone }) {
	const theme = useTheme();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const { addNewData } = useChecklistData();
	const [value, setValue] = useState<'0' | '1'>('1');

	const { isLoading: confirmLoading, mutate: confirmTransfer } = useTransferChequeInitiate();
	const { isLoading: rejectLoading, mutate: rejectTransfer } = useRejectTransferChequeInitiate();

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value as '0' | '1');
	};

	const handleSubmit = (type: 'confirm' | 'reject') => {
		const preparedData = {
			customerNumber: 0,
			description: checkData.description,
			reason: checkData.reason,
			sayadNo: Number(checkData.sayadId),
			toIban: '',
			receivers: checkData.receivers
		};

		if (type === 'confirm')
			confirmTransfer(preparedData, {
				onError: (err) => pushAlert({ type: 'error', hasConfirmAction: true, messageText: err.detail }),
				onSuccess: (res) => {
					addNewData({ otpTransferRequirments: res, transferAction: 'confirm' });
					navigate(paths.ReceivedChecksList.OtpTransferConfirmation);
				}
			});

		if (type === 'reject')
			rejectTransfer(preparedData, {
				onError: (err) => pushAlert({ type: 'error', hasConfirmAction: true, messageText: err.detail }),
				onSuccess: (res) => {
					addNewData({ otpTransferRequirments: res, transferAction: 'reject' });
					navigate(paths.ReceivedChecksList.OtpTransferConfirmation);
				}
			});
	};

	return (
		<BoxAdapter fullWidth={matches}>
			<Grid
				minHeight={matches ? 'calc(100vh - 64px)' : 'calc(100vh - 192px)'}
				container
				direction={'column'}
				wrap="nowrap"
				justifyContent={'space-between'}
			>
				<Grid
					container
					direction={'column'}
					gap={'16px'}
				>
					{!matches ? (
						// TODO: check if selected compony or homself acocunt and add one more step if it is compony
						<Stepper
							list={[t('checkInfo'), t('verificationCode'), t('end')]}
							active={0}
						/>
					) : null}

					<CheckOverViewBox
						amount={Number(checkData?.amount)}
						sayadNo={Number(checkData?.sayadId)}
					/>
					<PersonsList
						recievers={checkData.receivers}
						holders={checkData.holders}
					/>
					<Typography>{t('confirmOrRejectTransferText')}</Typography>
					<RadioGroup
						dir={theme.direction}
						name="confirmOrReject"
						value={value}
						onChange={handleRadioChange}
					>
						<Grid
							sx={{
								display: 'flex',
								flexDirection: matches ? 'column' : 'row',
								gap: '16px',
								width: '100%'
							}}
						>
							<RadioButtonAdapter
								value={'1'}
								label={t('confirmTransfer')}
								onChange={handleRadioChange}
								checked={value === '1'}
							/>
							<RadioButtonAdapter
								value={'0'}
								label={t('rejectTransfer')}
								onChange={handleRadioChange}
								checked={value === '0'}
							/>
						</Grid>
					</RadioGroup>
				</Grid>
				<Grid container>
					<ButtonAdapter
						variant="contained"
						size="medium"
						muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
						forwardIcon
						onClick={() => handleSubmit(value === '1'? 'confirm' :'reject')}
					>
						{t('continue')}
					</ButtonAdapter>
				</Grid>
			</Grid>
			<Loader showLoader={confirmLoading || rejectLoading} />
		</BoxAdapter>
	);
}
