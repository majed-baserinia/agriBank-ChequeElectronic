import { Grid, RadioGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import IssueWithDrawalGroupsCommand from 'business/application/cheque/Digital Cheque/Issue With drawal groups/IssueWithDrawalGroupsCommand';
import useInquiryWithDrawalGroup from 'business/hooks/cheque/Digital Cheque/useInquiryWithDrawalGroup';
import useIssueWithDrawalGroup from 'business/hooks/cheque/Digital Cheque/useIssueWithDrawalGroup';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/issueCheck/dataSteps';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DraggableList from 'ui/components/DraggableList';
import Menu from 'ui/components/Menu';
import RadioButtonOpenable from 'ui/components/RadioButtonOpenable';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import ModalOrPage from 'ui/htsc-components/ModalOrPage';
import Stepper from 'ui/htsc-components/Stepper';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { menuList } from '../../HomePage/menuList';
const data = {
	issueChequeKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
	withdrawalGroup: [
		{
			groupNumber: 'groupNumber1',
			withdrawalGroups: [
				{
					customerNumber: 1000,
					name: 'غزل عادل زاده'
				}
			]
		},
		{
			groupNumber: 'groupNumber2',
			withdrawalGroups: [
				{
					customerNumber: 1001,
					name: 'بیتا پاکنژاد'
				},
				{
					customerNumber: 1002,
					name: 'سروش شروری'
				}
			]
		},
		{
			groupNumber: 'groupNumber3',
			withdrawalGroups: [
				{
					customerNumber: 3000,
					name: 'وحید علیمردانی'
				},
				{
					customerNumber: 3001,
					name: 'پروین افشار'
				}
			]
		}
	]
};

export default function SignatureGroup() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
	const { steps, setStepData } = useDataSteps((store) => store);
	const { mutate: IssueWithDrawalGroup, isLoading } = useIssueWithDrawalGroup();
	const GetStepData = useDataSteps((s) => s.steps.signitureRequirementData);

	const {
		data: InquiryWithDrawalGroupData,
		mutate: InquiryWithDrawalGroupMutate,
		error
	} = useInquiryWithDrawalGroup();
	const [value, setValue] = useState(data?.withdrawalGroup[0].groupNumber);
	const [listOrder, setListOrder] = useState<{ customerNumber: number; name: string }[]>();
	const [selectedGroup, setSelectedGroup] = useState(
		data?.withdrawalGroup.find((g) => g.groupNumber === value)?.withdrawalGroups
	);
	console.log({ selectedGroup });

	const [open, setOpen] = useState(false);
	useEffect(() => {
		InquiryWithDrawalGroupMutate(
			//{ issueChequeKey: GetStepData?.issueChequeKey },
			{ issueChequeKey: '36a2e042-8481-4f5f-93f0-52e3ed29ae33' },
			{
				onError: (err) => {
					pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
				}
			}
		);
	}, []);
	const {
		data: IssueWithDrawalGroupData,
		mutate: IssueWithDrawalGroupMutate,
		error: IssueWithDrawalGroupError
	} = useIssueWithDrawalGroup();

	const IssueWithDrawalGroupSubmit = () => {
		const data: IssueWithDrawalGroupsCommand = {
			isSequentional:false,
			issueChequeKey: GetStepData?.issueChequeKey!,
			withDrawalGroup: [
				{
					groupNumber: value,
					withdrawalGroups: selectedGroup!
				}
			]
		};
		IssueWithDrawalGroupMutate(data, {
			onSuccess: (response) => {},
			onError: (err) => {
				if (err.status == 453) {
					pushAlert({
						type: 'error',
						messageText: err.detail,
						hasConfirmAction: true,
						actions: {
							onCloseModal: () => navigate('/cheque'),
							onConfirm: () => navigate('/cheque')
						}
					});
				}
				pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
			}
		});
	};

	function handleListUpdate() {
		setSelectedGroup(listOrder);
		setOpen(false);
	}
	return (
		<Grid
			container
			sx={{ padding: matches ? '0' : '64px 0' }}
			justifyContent={'center'}
			gap={'24px'}
			dir={theme.direction}
		>
			<Grid
				item
				xs={12}
				md={8}
			>
				<BoxAdapter fullWidth={matches}>
					<Grid
						minHeight={matches ? 'calc(100vh - 64px)' : 'calc(100vh - 192px)'}
						container
						direction={'column'}
						justifyContent={'space-between'}
						wrap="nowrap"
					>
						<Grid
							container
							direction={'column'}
							gap={'16px'}
						>
							<Title>{t('issueElCheck')}</Title>
							{!matches ? (
								<Stepper
									list={[
										t('selectCheck'),
										t('checkInfo'),
										t('recivers'),
										t('issueSignature'),
										t('selectSignatureGroup'),
										t('end')
									]}
									active={4}
								/>
							) : null}
							<Typography
								variant="bodyMd"
								sx={{ marginBottom: '16px' }}
							>
								{t('signatureGroupText')}
							</Typography>
							<Grid
								container
								spacing={'24px'}
							>
								<RadioGroup
									value={value}
									onChange={(e) => {
										setValue(e.target.value);
									}}
									sx={{ width: '100%', marginLeft: '20px' }}
								>
									{data.withdrawalGroup.map((item) => (
										<RadioButtonOpenable
											key={item.groupNumber}
											label={
												item.withdrawalGroups
													.map((group) => {
														return group?.name;
													})
													.join(', ') || ''
											}
											onEditClick={() => setOpen(true)}
											groupParts={selectedGroup ? selectedGroup.map((group) => group?.name) : []}
											value={item.groupNumber}
											checked={value === item.groupNumber}
											onChange={(e) => {
												//console.log(e.target.value);
												setSelectedGroup(
													data?.withdrawalGroup.find((g) => g.groupNumber === e.target.value)
														?.withdrawalGroups
												);
												setValue(e.target.value);
											}}
										/>
									))}
								</RadioGroup>
							</Grid>
						</Grid>

						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%' } }}
								forwardIcon
								onClick={IssueWithDrawalGroupSubmit}
							>
								{t('continue')}
							</ButtonAdapter>
						</Grid>
					</Grid>
				</BoxAdapter>
			</Grid>

			{matches ? null : (
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
			)}
			<ModalOrPage
				open={open}
				setOpen={setOpen}
				breackpoint="sm"
			>
				<Grid
					container
					direction={'column'}
					gap={'32px'}
					justifyContent={'space-between'}
					sx={{ borderRadius: '24px', padding: matchesSM ? '16px ' : '40px', height: '100%' }}
				>
					<Grid>
						<Grid
							container
							flexWrap={'nowrap'}
							gap={'8px'}
						>
							<SvgToIcon
								icon={infoIcon}
								alt="info"
							/>
							<Typography variant='bodyMd' textOverflow={'ellipsis'}>{t('draggableListText')}</Typography>
						</Grid>
						<DraggableList
							list={
								selectedGroup?.map((item) => {
									return { id: item.customerNumber.toString(), text: item.name };
								}) || []
							}
							getData={(newList) => {
								const list = newList.map((i) => ({ customerNumber: Number(i.id), name: i.text as string }));
								setListOrder(list);
							}}
						/>
					</Grid>
					<ButtonAdapter
						variant="contained"
						size="medium"
						muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
						onClick={() => handleListUpdate()}
					>
						{t('register')}
					</ButtonAdapter>
				</Grid>
			</ModalOrPage>
		</Grid>
	);
}
