import { Grid, RadioGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import IssueWithDrawalGroupsCommand from 'business/application/cheque/Digital Cheque/Issue With drawal groups/IssueWithDrawalGroupsCommand';
import useIssueWithDrawalGroup from 'business/hooks/cheque/Digital Cheque/useIssueWithDrawalGroup';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useIssueCheckWizardData } from 'business/stores/issueCheck/useIssueCheckWizardData';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DraggableList from 'ui/components/DraggableList';
import Menu from 'ui/components/Menu';
import RadioButtonAdapter from 'ui/htsc-components/RadioButtonAdapter';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import ModalOrPage from 'ui/htsc-components/ModalOrPage';
import Stepper from 'ui/htsc-components/Stepper';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { menuList } from '../../HomePage/menuList';
import useIssueChequeInitiate from "business/hooks/cheque/Digital Cheque/useIssueChequeInitiate";
import useInquiryWithDrawalGroup from 'business/hooks/cheque/Digital Cheque/useInquiryWithDrawalGroup';
import { useLoadingHandler } from '@agribank/ui/components/Loader';
import { paths } from 'ui/route-config/paths';


export default function SignatureGroup() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
	const [data, setData] = useState<any>();
	const { isLoading, mutateAsync: issueChequeInitiate } = useIssueChequeInitiate();
	const { isLoading: isLoadingInquiryWithDrawalGroupMutate, mutateAsync: InquiryWithDrawalGroupMutate } = useInquiryWithDrawalGroup();
	const store = useIssueCheckWizardData((store) => store);

	const [value, setValue] = useState(data?.withdrawalGroup[0].groupNumber);
	const [listOrder, setListOrder] = useState<{ customerNumber: number; name: string }[]>();
	const [selectedGroup, setSelectedGroup] = useState(data?.withdrawalGroup.find((g) => g.groupNumber === value)?.withdrawalGroups);

	// const [open, setOpen] = useState(false);

	const { setNewDataToWizard, addReceiverPage, CorporateChequeCompany } = useIssueCheckWizardData((store) => store);


	useEffect(() => {
		const fetchData = async () => {
			const resultIssueChequeInitiate = await issueChequeInitiate(
				{
					amount: Number(store.checkInfoPage?.checkAmount),
					dueDate: String(store.checkInfoPage?.date),
					description: store.checkInfoPage?.description ?? "",
					toIban: store.checkInfoPage?.recieverIban ?? "",
					sayadNo: store.selectCheckPage?.checkData.sayadNo ?? "",
					recievers: store.addReceiverPage?.receivers ?? [],
					reason: "POSA"
				}
			)

			const resultInquiryWithDrawalGroupMutate = await InquiryWithDrawalGroupMutate({ issueChequeKey: resultIssueChequeInitiate.issueChequeKey });
			console.log(resultInquiryWithDrawalGroupMutate)
			setNewDataToWizard({
				addReceiverPage: {
					receivers: addReceiverPage?.receivers,
					signitureRequirementData: { issueChequeKey: resultIssueChequeInitiate.issueChequeKey }
				}
			})
			setData(resultInquiryWithDrawalGroupMutate)
		};
		fetchData();
	}, []);


	const { mutateAsync: IssueWithDrawalGroupMutate } = useIssueWithDrawalGroup();
	const IssueWithDrawalGroupSubmit = async () => {
		const data = {
			isSequentional: false,
			issueChequeKey: addReceiverPage?.signitureRequirementData?.issueChequeKey!,
			withDrawalGroups: { groupNumber: value, withdrawalGroups: selectedGroup! }
		};
		const result: any = await IssueWithDrawalGroupMutate(data);
		if (result) {
			setNewDataToWizard({
				CorporateChequeCompany: { ...CorporateChequeCompany, canSign: result.canSign, canSendOtp: result.canSendOtp }
			})
			navigate(paths.IssueCheck.ChequeReceiptPreview);
		}
	};

	// function handleListUpdate() {
	// 	setSelectedGroup(listOrder);
	// 	setOpen(false);
	// }

	useLoadingHandler(isLoadingInquiryWithDrawalGroupMutate || isLoading);

	return (
		<Grid
			// container
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
							{/* {!matches ? (
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
							) : null} */}
							<Typography
								variant="bodyMd"
								sx={{ marginBottom: '16px' }}
							>
								{t('signatureGroupText')}
							</Typography>
							<Grid
								// container
								spacing={'24px'}
							>
								<RadioGroup
									value={value}
									onChange={(e) => {
										setValue(e.target.value);
									}}
									sx={{ width: '100%', gap: 10 }}
								>
									{data?.withdrawalGroup.map((item) => {
										return (
											<RadioButtonAdapter
												key={item.groupNumber}
												label={item.withdrawalGroups.map((group) => { return `${group?.firstName} ${group?.lastName}` }).join(' , ') || ''
												}
												// onEditClick={() => setOpen(true)}
												// groupParts={selectedGroup ? selectedGroup.map((group) => group?.name) : []}
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
										)
									}
									)}
								</RadioGroup>
							</Grid>
						</Grid>

						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', minHeight: "48px" } }}
								forwardIcon
								onClick={IssueWithDrawalGroupSubmit}
							>
								{t('continue')}
							</ButtonAdapter>
						</Grid>
					</Grid>
				</BoxAdapter>
			</Grid>

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
			{/* <ModalOrPage
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
							<Typography
								variant="bodyMd"
								textOverflow={'ellipsis'}
							>
								{t('draggableListText')}
							</Typography>
						</Grid>
						<DraggableList
							list={
								selectedGroup?.map((item) => {
									return { id: item.customerNumber.toString(), text: item.name };
								}) || []
							}
							getData={(newList) => {
								const list = newList.map((i) => ({
									customerNumber: Number(i.id),
									name: i.text as string
								}));
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
			</ModalOrPage> */}
		</Grid>
	);
}
