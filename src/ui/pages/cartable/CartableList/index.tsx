import { Grid, MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import useCartableInquiryCommand from 'business/hooks/cheque/checklist/useCartableInquiryCommand';
import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';
import { Check } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import BreadcrumbsAdapter from 'ui/htsc-components/BreadcrumbsAdapter';
import SelectAdapter from 'ui/htsc-components/SelectAdapter';
import DesktopView from '../../../components/CheckListComps/cartable/DesktopView';
import MobileView from '../../../components/CheckListComps/cartable/Mobileview';
import { breadcrumbs } from '../SelectList';

export default function CartableList() {
	const cif = new URLSearchParams(window.location.search).get('cif');
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('tablet'));
	const { relatedCustomers, addNewCartableData } = useCartableChecklistData((store) => store);
	const { mutate: getCartableInquiry, isLoading } = useCartableInquiryCommand();

	const [checkList, setCheckList] = useState<Check[]>();
	const [selectedBeneficiary, setSelectedBeneficiary] = useState(cif);
	const [selectedBeneficiaryName, setSelectedBeneficiaryName] = useState<string>();

	const getBeneficiariesCheckLists = () => {
		getCartableInquiry(
			{ customerNumber: Number(selectedBeneficiary) },

			{
				onSuccess(data) {
					setCheckList(data.cheques);
					addNewCartableData({ cartableListData: data });
				}
			}
		);
	};

	useEffect(() => {
		if (relatedCustomers !== undefined) {
			//serch through related for the given cif
			const beneficiary = relatedCustomers.find((item) => item.customerNumber === Number(cif));
			if (beneficiary) {
				setSelectedBeneficiary(beneficiary.customerNumber.toString());
				setSelectedBeneficiaryName(beneficiary.fullName);
			}
		}

		getBeneficiariesCheckLists();
	}, [selectedBeneficiary]);

	return (
		<Grid sx={{ padding: { tablet: '64px 0', xs: '0' } }}>
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
						minHeight: { tablet: 'calc(100% - 128px)', xs: '100vh' },
						padding: { tablet: '16px', xs: '0' }
					}}
					container
					direction={'column'}
					gap={'16px'}
				>
					<BreadcrumbsAdapter breadcrumbs={breadcrumbs} />
					<Grid
						container
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Typography
							variant="bodyMd"
							fontWeight={'medium'}
						>
							{t('payTo')}
							{relatedCustomers?.length === 1 ? t('you') : selectedBeneficiaryName}
						</Typography>
						<Grid width={'30%'}>
							{relatedCustomers!.length > 1 ? (
								<SelectAdapter
									size="small"
									label=""
									onChange={(value) => setSelectedBeneficiary(value)}
									defaultValue={selectedBeneficiary as string}
								>
									{relatedCustomers?.map((item) => (
										<MenuItem
											value={item.customerNumber}
											key={item.customerNumber}
										>
											{item.fullName}
										</MenuItem>
									))}
								</SelectAdapter>
							) : null}
						</Grid>
					</Grid>
					{matches ? (
						<MobileView list={!isLoading ? checkList : undefined} />
					) : (
						<DesktopView list={!isLoading ? checkList : undefined} />
					)}
				</Grid>
			</BoxAdapter>
		</Grid>
	);
}
