import fluentValidationResolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import TransferBasicCheckDataValidatorCommand from 'business/application/cheque/transferCheck/TransferBasicCheckDataValidator/TransferBasicCheckDataValidatorCommand';
import useGetReasonCodes from 'business/hooks/cheque/Digital Cheque/useGetReasonCodes';
import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';
import { InquiryTransferStatusRespone } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusResponse';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import NewCheckInfoBasics from 'ui/components/NewCheckInfoBasics';

import BottomSheetSelect from 'ui/htsc-components/BottomSheetSelect';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import TextareaAdapter from 'ui/htsc-components/TextareaAdapter';

import { paths } from 'ui/route-config/paths';

export default function FirstPersonView({
	checkData,
	setLoading
}: {
	checkData?: InquiryTransferStatusRespone;
	setLoading: Dispatch<SetStateAction<boolean>>;
}) {
	const theme = useTheme();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { basicCheckData, addNewCartableData, selectedCheck } = useCartableChecklistData();

	const { data: reasonCodes, isLoading: isPendingtoGetReasons, isError } = useGetReasonCodes();

	useEffect(() => {
		if (!isPendingtoGetReasons) {
			setLoading(false);
		}

		if (basicCheckData) {
			reset({
				description: basicCheckData.description,
				reason: basicCheckData.reason
			});
		}
	}, [isPendingtoGetReasons, basicCheckData]);

	const { control, formState, handleSubmit, reset } = useForm<TransferBasicCheckDataValidatorCommand>({
		resolver: (values, context, options) => {
			return fluentValidationResolver(values, context, options);
		},
		context: TransferBasicCheckDataValidatorCommand
	});

	const onSubmit = (data: TransferBasicCheckDataValidatorCommand) => {
		addNewCartableData({ basicCheckData: { ...data }, transferAction: 'confirm' });
		navigate(paths.cartable.AddNewReceivers);
	};

	return (
		<BoxAdapter
			fullWidth={matches}
			muiPaperProps={{
				sx: {
					minWidth: '25%',
					borderRadius: { md: '32px', xs: 0 },
					padding: '16px'
				}
			}}
		>
			<Grid
				minHeight={matches ? 'calc(100vh - 32px)' : 'calc(100vh - 192px)'}
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

					<NewCheckInfoBasics
						hasTitle
						checkData={{
							description: checkData ? checkData.description : selectedCheck!.dataFromList!.description,
							amount: checkData
								? checkData.amount.toString()
								: selectedCheck!.dataFromList!.amount.toString(),
							date: checkData ? checkData.dueDate : selectedCheck!.dataFromList!.dueDate,
							sayad: checkData ? checkData.sayadId : selectedCheck!.dataFromList!.sayadNo.toString(),
							reason: checkData
								? checkData.reasonDescription
								: selectedCheck!.dataFromList!.reasonDescription,
							serie: checkData ? checkData.seriesNo : selectedCheck!.dataFromList!.seriesNo.toString(),
							serial: checkData ? checkData.serialNo : selectedCheck!.dataFromList!.serialNo.toString(),
							checkStatus: checkData
								? checkData.chequeStatusDescription
								: selectedCheck?.dataFromList?.chequeStatusDescription,
							sheba: checkData ? checkData.fromIban : selectedCheck?.dataFromList?.fromIban
						}}
					/>

					<Grid
						item
						xs={5}
					>
						<Controller
							name="reason"
							control={control}
							render={({ field }) => (
								<BottomSheetSelect
									defaultValue={field?.value?.value}
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
									defaultValue={field.value}
									onChange={(value) => field.onChange(value)}
									isRequired
									label={t('description')}
									error={!!formState?.errors?.description}
									helperText={formState?.errors?.description?.message}
								/>
							)}
						/>
					</Grid>
				</Grid>
				<Grid container>
					<ButtonAdapter
						variant="contained"
						size="medium"
						muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
						forwardIcon
						onClick={handleSubmit(onSubmit)}
					>
						{t('continue')}
					</ButtonAdapter>
				</Grid>
			</Grid>
		</BoxAdapter>
	);
}
