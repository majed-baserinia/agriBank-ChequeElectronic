import { Grid, MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';

import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import SelectAdapter from 'ui/htsc-components/SelectAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import keshavarzi from 'assets/icon/Banks/Color/Keshavarzi.svg';
import useAccounts from 'business/hooks/cheque/Digital Cheque/useAccounts';
import useGetCheckbooks from 'business/hooks/cheque/Digital Cheque/useGetCheckbooks';
import useGetChecksheets from 'business/hooks/cheque/Digital Cheque/useGetChecksheets';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/issueCheck/dataSteps';
import { CheckSheet } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse';
import { useEffect, useState } from 'react';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';
import { menuList } from '../../HomePage/menuList';

export default function SelectAccount() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const setDataForNextStep = useDataSteps((store) => store.setStepData);

	const { data: AccountData, isLoading, error: useAccountsError } = useAccounts();
	const { data: checkbooks, mutate: getCheckbooks, error: checkbooksError } = useGetCheckbooks();
	const { data: checksheets, mutate: getChecksheets, error: checksheetsError } = useGetChecksheets();

	const [selectedAccountNumber, setSelectedAccountNumber] = useState('');
	const [selectedCheckbook, setSelectedCheckbook] = useState<null | {}>(null);
	const [selectedChecksheet, setSelectedChecksheet] = useState<null | CheckSheet>(null);

	useEffect(() => {
		let errorMessage;
		if (checkbooksError) errorMessage = checkbooksError.detail;
		if (checksheetsError) errorMessage = checksheetsError.detail;
		if (useAccountsError) errorMessage = useAccountsError.detail;

		if (useAccountsError || checksheetsError || checkbooksError) {
			pushAlert({
				type: 'error',
				messageText: errorMessage,
				hasConfirmAction: true,
				actions: {
					onCloseModal: () => navigate(paths.Home),
					onConfirm: () => navigate(paths.Home)
				}
			});
		}
	}, [checkbooksError, checksheetsError, useAccountsError]);

	const handleNextStep = () => {
		//save the needed data for next page
		setDataForNextStep({
			selectdCheckSheet: selectedChecksheet
		});

		//navigate next page
		navigate(paths.IssueCheck.CheckInfoPath);
	};

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
						<Grid>
							{!matches ? (
								<Stepper
									list={[
										t('selectCheck'),
										t('checkInfo'),
										t('recivers'),
										t('issueSignature'),
										t('end')
									]}
									active={0}
								/>
							) : null}
							<Typography
								variant="bodyMd"
								sx={{ marginBottom: '16px' }}
							>
								{t('selectAaccountText')}
							</Typography>
							<Grid
								container
								spacing={'24px'}
								direction={'row'}
							>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
									lg={6}
									xl={6}
									sx={{ order: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1 } }}
								>
									<SelectAdapter
										onChange={(selectedValue) => {
											setSelectedAccountNumber(selectedValue);
											getCheckbooks({ accountNumber: selectedValue });
										}}
										label={t('accountsList')}
										renderValue
									>
										{AccountData?.map((item, index) => {
											return (
												<MenuItem
													key={index}
													style={{ margin: '10px 0' }}
													value={item.accountNumber}
												>
													<Grid
														container
														justifyContent={'center'}
														alignItems="Center"
														gap={'5px'}
														wrap="nowrap"
													>
														<Grid sx={{ height: '30px', width: '30px' }}>
															<img
																style={{ width: '100%', height: '100%' }}
																src={keshavarzi}
																alt={'icon'}
															/>
														</Grid>
														<Grid
															container
															direction={'column'}
															alignItems="flex-start"
															gap={'5px'}
														>
															<Typography
																variant="bodyXs"
																color={theme.palette.grey[200]}
															>
																{!item.isShared
																	? `${item.owners[0]?.firstName} ${item.owners[0]
																			?.lastName} ${t('curentAccountP')}`
																	: t('sharedAccountP')}
															</Typography>

															<Typography variant="bodyMd">
																{item.accountNumber}
															</Typography>
														</Grid>
													</Grid>
												</MenuItem>
											);
										})}
									</SelectAdapter>
								</Grid>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
									lg={6}
									xl={6}
									sx={{ order: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3 } }}
								>
									<SelectAdapter
										disabled={!selectedCheckbook}
										onChange={() => {}}
										label={t('checkSheet')}
										renderValue
									>
										{/* <ChipWrapperForSelect>
											<ChipAdapter
												label={t('all')}
												onClick={(e) => {}}
											/>
											<ChipAdapter
												label={t('whiteCheck')}
												onClick={(e) => {}}
												checked
											/>
											<ChipAdapter
												label={t('issuedCheck')}
												onClick={(e) => {}}
											/>
										</ChipWrapperForSelect> */}
										{checksheets?.map((sheet, index) => {
											if (!sheet.isUsed) {
												return (
													<MenuItem
														key={index}
														value={sheet.sayadNo}
														onClick={(e) => {
															setSelectedChecksheet(sheet);
														}}
														sx={{
															border: `1px solid ${theme.palette.grey[50]}`,
															borderRadius: '16px',
															margin: '16px',
															'&:hover': {
																backgroundColor: 'unset',
																border: `2px solid ${theme.palette.primary.main}`
															}
														}}
													>
														<Grid
															container
															direction={'column'}
															justifyContent={'center'}
															spacing={'8px'}
															sx={{ padding: '16px' }}
															gap={'8px'}
														>
															<Typography
																variant="bodyMd"
																fontWeight={'bold'}
															>
																{t('sayadNumber')}:{sheet.sayadNo}
															</Typography>
															<Typography
																variant="bodyXs"
																fontWeight={'medium'}
															>
																{t('serieAndSerial')}: {sheet.chequeFrom} |
																{sheet.chequeTo}
															</Typography>
														</Grid>
													</MenuItem>
												);
											} else return;
										})}
									</SelectAdapter>
								</Grid>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
									lg={6}
									xl={6}
									sx={{ order: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 } }}
								>
									<SelectAdapter
										disabled={!selectedAccountNumber}
										onChange={() => {}}
										label={t('checkbook')}
										renderValue
									>
										{checkbooks?.map((checkbook, index) => {
											return (
												<MenuItem
													key={index}
													value={checkbook.chequeTo}
													onClick={(e) => {
														const selectedCheckbook = {
															accountNumber: selectedAccountNumber,
															startChequeNo: checkbook.chequeFrom,
															endChequeNo: checkbook.chequeTo
														};
														setSelectedCheckbook(selectedCheckbook);
														getChecksheets(selectedCheckbook);
													}}
													sx={{
														border: `1px solid ${theme.palette.grey[50]}`,
														borderRadius: '16px',
														margin: '16px',
														'&:hover': {
															backgroundColor: 'unset',
															border: `2px solid ${theme.palette.primary.main}`
														}
													}}
												>
													<Grid
														container
														direction={'column'}
														justifyContent={'center'}
														spacing={'8px'}
														sx={{ padding: '16px' }}
														gap={'8px'}
													>
														<Typography
															variant="bodyMd"
															fontWeight={'bold'}
														>
															{t('checkbookNumber')}:{checkbook.chequeTo}
														</Typography>
														<Typography
															variant="bodyXs"
															fontWeight={'medium'}
														>
															{t('issueDate')}:{checkbook.issueDate}
														</Typography>
													</Grid>
												</MenuItem>
											);
										})}
									</SelectAdapter>
								</Grid>
							</Grid>
						</Grid>

						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
								forwardIcon
								onClick={() => handleNextStep()}
								disabled={!selectedChecksheet}
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
			<Loader showLoader={isLoading} />
		</Grid>
	);
}
