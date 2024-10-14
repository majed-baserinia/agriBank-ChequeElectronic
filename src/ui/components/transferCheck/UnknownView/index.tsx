import { Grid, RadioGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
import useGetReasonCodes from 'business/hooks/cheque/Digital Cheque/useGetReasonCodes';
import { InquiryTransferStatusRespone } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusResponse';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import NewCheckInfoBasics from 'ui/components/NewCheckInfoBasics';

import BottomSheetSelect from 'ui/htsc-components/BottomSheetSelect';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import RadioButtonAdapter from 'ui/htsc-components/RadioButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import TextareaAdapter from 'ui/htsc-components/TextareaAdapter';

export default function UnknownView({ checkData }: { checkData: InquiryTransferStatusRespone }) {
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const { data: reasonCodes, isLoading: isPendingtoGetReasons, isError } = useGetReasonCodes();
	const [value, setValue] = useState('1');

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};
	const { control, formState } = useForm();

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
							list={[
								t('checkInfo'),
								t('recivers'),
								t('verificationCode'),
								t('selectSignatureGroup'),
								t('end')
							]}
							active={0}
						/>
					) : null}

					{/* <CheckOverViewBox amount={231321321} sayadNo={213212} /> */}
					{checkData ? (
						<NewCheckInfoBasics
							hasTitle
							checkData={{
								amount: checkData.amount.toString(),
								description: checkData.description,
								date: checkData.dueDate,
								sayad: checkData.sayadId,
								reason: checkData.reasonDescription,
								serie: checkData.seriesNo,
								serial: checkData.serialNo,
								checkStatus: checkData.chequeStatusDescription,
								sheba: checkData.fromIban
							}}
						/>
					) : null}

					<Grid
						item
						xs={5}
					>
						<Controller
							name="reason"
							control={control}
							render={({ field }) => (
								<BottomSheetSelect
									isRequired
									label={t('reason')}
									list={
										isPendingtoGetReasons || isError
											? []
											: reasonCodes.map((reason) => ({
													value: reason.reasonCode,
													name: reason.description
												}))
									}
									onChange={(item) => {
										field.onChange(item);
									}}
									error={!!formState?.errors?.reason}
									helperText={formState?.errors?.reason?.message as string}
								/>
							)}
						/>
					</Grid>
					<Grid
						item
						xs={12}
					>
						<Controller
							name="description"
							control={control}
							render={({ field }) => (
								<TextareaAdapter
									onChange={(value) => field.onChange(value)}
									isRequired
									label={t('description')}
									error={!!formState?.errors?.description}
									helperText={'formState?.errors?.description?.message'}
								/>
							)}
						/>
					</Grid>
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
								value="1"
								label={t('confirmTransfer')}
								onChange={handleRadioChange}
								checked={value == '1'}
							/>
							<RadioButtonAdapter
								value="2"
								label={t('rejectTransfer')}
								onChange={handleRadioChange}
								checked={value == '2'}
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
						onClick={() => console.log()}
					>
						{t('continue')}
					</ButtonAdapter>
				</Grid>
			</Grid>
		</BoxAdapter>
	);
}
