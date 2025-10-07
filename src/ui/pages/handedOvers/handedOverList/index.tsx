import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import BreadcrumbsAdapter from 'ui/htsc-components/BreadcrumbsAdapter';

import useChakavakGetEChequeList from 'business/hooks/cheque/checklist/useChakavakGetEChequeList';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useHandedOversData } from 'business/stores/handedOverChecks/useHandedOversStore';
import { ChakavakGetEChequeListResponse } from 'common/entities/cheque/chekList/ChakavakGetEChequeList/ChakavakGetEChequeListResponse';
import DesktopView from '../../../components/CheckListComps/chakavak/DesktopView';
import MobileView from '../../../components/CheckListComps/chakavak/Mobileview';
import Filter from '../../../components/Filter/Filter';
import { breadcrumbs } from '../SelectHandedOverList';

export default function HandedOverList() {
	const cif = new URLSearchParams(window.location.search).get('cif');
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('tablet'));
	const { addNewStoreData, selectListPage } = useHandedOversData((store) => store);
	const { mutate: ChakavakGetEChequeList, isLoading } = useChakavakGetEChequeList();

	const [chakavakCheckList, setChakavakCheckList] = useState<ChakavakGetEChequeListResponse>();
	const [selectedBeneficiaryName, setSelectedBeneficiaryName] = useState<string>();

	useEffect(() => {
		getAllCheckLists();
	}, []);

	const getAllCheckLists = () => {
		ChakavakGetEChequeList(
			{ CustomerNo: Number(cif), PageNo: 1, PageSize: 50 },
			{
				onSuccess(data) {
					setChakavakCheckList(data);
					addNewStoreData({ listPage: { allCheckList: data } });
				},
				onError(error) {
					pushAlert({
						type: 'error',
						messageText: error.detail,
						hasConfirmAction: true,
						actions: { onConfirm: () => navigate(-1) }
					});
				}
			}
		);
	};

	const getListOfTheChecksByFilters = (
		customerNumber?: number,
		status?: number,
		accountNumber?: number,
		serial?: string
	) => {
		const preparedData = {
			CustomerNo: 0,
			PageNo: 1,
			PageSize: 50,
			AccountNo: accountNumber ? accountNumber : undefined,
			ChqStatus: status ? status : undefined,
			Serial: serial ? serial : undefined
		};
		ChakavakGetEChequeList(
			preparedData,

			{
				onSuccess(data) {
					setChakavakCheckList(data);
				},
				onError(err) {
					pushAlert({
						type: 'error',
						messageText: err.detail,
						hasConfirmAction: true
					});
				}
			}
		);
	};

	return (
		<Grid sx={{ padding: { xs: 0, tablet: '32px' } }}>
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
					sx={{
						minHeight: {
							sm: '100vh',
							tablet: 'calc(100% - 64px)'
						},
						padding: {
							tablet: '16px',
							md: 0
						}
					}}
					container
					direction={'column'}
					gap={'16px'}
				>
					{/* <BreadcrumbsAdapter breadcrumbs={breadcrumbs} /> */}
					<Grid
						container
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Typography
							display={{ tablet: 'block', xs: 'none' }}
							variant="bodyMd"
							fontWeight={'medium'}
						>
							{t('payTo')}
							{selectListPage?.relatedCustomers?.length === 1 ? t('you') : selectedBeneficiaryName}
						</Typography>

						<Grid width={{ tablet: '30%', xs: '100%' }}>
							{selectListPage?.relatedCustomers ? (
								<Filter
									relatedCustomers={selectListPage?.relatedCustomers}
									onFilter={(o) => {
										// console.log(o);

										getListOfTheChecksByFilters(
											o.customerNumber,
											o.status,
											o.accountNumber,
											o.serial
										);
									}}
								/>
							) : null}
						</Grid>
					</Grid>
					{matches ? (
						<MobileView list={!isLoading ? chakavakCheckList : undefined} />
					) : (
						<DesktopView list={!isLoading ? chakavakCheckList : undefined} />
					)}
				</Grid>
			</BoxAdapter>
		</Grid>
	);
}
