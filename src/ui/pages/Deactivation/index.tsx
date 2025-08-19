import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import useGetAllRelatedCustomers from 'business/hooks/cheque/checklist/useGetAllRelatedCustomers';
import useChakadDeactivateCustomer from 'business/hooks/cheque/deactivation/useChakadDeactivateCustomer';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { Loader, useLoadingHandler } from "@agribank/ui/components/Loader";
import { paths } from 'ui/route-config/paths';

type MenuItems = {
	id: number;
	title: string;
	subtitle?: string;
	routeTo?: string;
	onClick?: () => void;
}[];

export default function Deactivation() {
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	const { data: listItems, isLoading } = useGetAllRelatedCustomers('checkList');
	const { mutate: deactiveCustomer, isLoading: deactiveLoading } = useChakadDeactivateCustomer();
	const [menuItems, setMenuItems] = useState<MenuItems>([]);

	useEffect(() => {
		if (listItems) {
			const newList: MenuItems = listItems.map((item, index) => {
				return {
					id: item.customerNumber,
					title: index === 0 ? 'myself' : item.fullName,
					//subtitle: index === 0 ? 'myChecksSubtitle' : 'othersChecksSubtitle',
					onClick: () => {
						pushAlert({
							type: 'warning',
							messageText: t('deactivationModalText'),
							hasConfirmAction: true,
							confirmButtonText: t('confirm'),
							hasRefuseAction: true,
							actions: {
								onRefuse: () => { },
								onConfirm: () => {
									deactiveCustomer(
										{ customerNumber: item.customerNumber },
										{
											onSuccess: (res) => {
												pushAlert({
													type: 'success',
													messageText: res.message,
													hasConfirmAction: true,

													actions: {
														onCloseModal: () => navigate(paths.Home),
														onConfirm: () => navigate(paths.Home)
													}
												});
											},
											onError: (err) => {
												pushAlert({
													type: 'error',
													messageText: err.detail,
													hasConfirmAction: true,
													actions: {
														onCloseModal: () => navigate(paths.Home),
														onConfirm: () => navigate(paths.Home)
													}
												});
											}
										}
									);
								},
								onCloseModal: () => { }
							}
						});
					}
				};
			});

			if (newList) {
				setMenuItems(newList);
			}
		}
	}, [listItems]);

	useLoadingHandler(isLoading || deactiveLoading);

	return (
		<Grid sx={{ padding: matches ? '0' : '64px' }}>
			<BoxAdapter fullWidth={matches}>
				<Grid
					sx={{
						minHeight: matches ? '100vh' : 'calc(100% - 128px)',
						padding: matches ? '0' : '16px'
					}}
					container
					direction={'column'}
					gap={'24px'}
				>
					<Grid
						container
						gap={'8px'}
					>
						<SvgToIcon
							icon={infoIcon}
							alt="info"
						/>
						<Typography
							variant="bodyMd"
							sx={{ color: theme.palette.text.secondary }}
						>
							{t('deactivationSelectText')}
						</Typography>
					</Grid>
					<Grid
						dir={theme.direction}
						container
						direction={'column'}
						gap={'56px'}
					>
						<Menu list={menuItems} />
					</Grid>
				</Grid>
			</BoxAdapter>
			{/* <Loader showLoader={isLoading || deactiveLoading} /> */}
		</Grid>
	);
}
