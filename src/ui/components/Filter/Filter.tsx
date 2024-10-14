import { Grid, MenuItem, Paper, Typography, useTheme } from '@mui/material';
import filterIcon from 'assets/icon/filter.svg';
import useGetAccountsQuery from 'business/hooks/cheque/GetAccountsQuery/useGetAccountsQuery';
import { useTranslation } from 'react-i18next';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import InputAdapter from 'ui/htsc-components/InputAdapter';
import ModalOrBottomSheet from 'ui/htsc-components/ModalOrBottomSheet';
import SelectAdapter from 'ui/htsc-components/SelectAdapter';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { Props } from './types';
import useFilter from './useFilter';

const CheckStatuses = [
	{ label: 'Reception of the user of the counter', value: 1 },
	{ label: 'confirmed', value: 2 },
	{ label: 'Sent to the central bank', value: 3 },
	{ label: 'Give back to the customer', value: 4 },
	{ label: 'Collection of the central bank', value: 7 },
	{ label: 'Give back of the central bank', value: 8 },
	{ label: 'Return of the central bank', value: 9 },
	{ label: 'Central bank error', value: 12 },
	{ label: 'Glossary of central bank', value: 15 }
];

export default function Filter(props: Props) {
	const { relatedCustomers } = props;
	const theme = useTheme();
	const { t } = useTranslation();
	const { data: accountNumberList } = useGetAccountsQuery();

	const { chips, open, setOpen, inputValue, addChips, filter } = useFilter(props);

	return (
		<>
			<Grid
				onClick={() => {
					setOpen(!open);
				}}
			>
				<Paper
					elevation={0}
					sx={{
						minWidth: '200px',
						display: 'flex',
						alignItems: 'center',
						padding: '4px',
						border: `1px solid ${theme.palette.grey[100]}`,
						borderRadius: '8px',
						backgroundColor: 'inherit'
					}}
					component="div"
				>
					<Grid
						container
						alignItems={'center'}
						gap={'4px'}
						width={80}
					>
						<SvgToIcon
							icon={filterIcon}
							alt="filter"
						/>
						<Typography variant="bodySm">{t('filter')}</Typography>
					</Grid>
					<Grid
						container
						alignItems={'center'}
						flexDirection={'row'}
						wrap="nowrap"
						sx={{ overflow: 'hidden' }}
						gap={'4px'}
					>
						{chips}
					</Grid>
				</Paper>
			</Grid>
			<ModalOrBottomSheet
				breackpoint="sm"
				snapPoints={[500]}
				open={open}
				setOpen={setOpen}
				title={t('filter')}
			>
				<Grid
					container
					direction={'column'}
					gap={'8px'}
				>
					<>
						<Typography variant="bodySm">{t('category')}</Typography>
						<SelectAdapter
							defaultValue={inputValue.category?.value}
							onChange={() => {}}
						>
							<MenuItem
								key={relatedCustomers[0].customerNumber}
								value={relatedCustomers[0].customerNumber.toString()}
								onClick={() => {
									addChips('category', {
										label: t('myself'),
										value: relatedCustomers[0].customerNumber.toString()
									});
								}}
							>
								{t('myself')}
							</MenuItem>
							{relatedCustomers.map((c, i) => {
								if (i === 0) return;
								return (
									<MenuItem
										key={c.customerNumber}
										value={c.customerNumber}
										onClick={() => {
											addChips('category', {
												label: c.fullName,
												value: c.customerNumber.toString()
											});
										}}
									>
										{c.fullName}
									</MenuItem>
								);
							})}
						</SelectAdapter>
					</>

					<>
						<Typography variant="bodySm">{t('status')}</Typography>
						<SelectAdapter
							defaultValue={inputValue.status?.value}
							onChange={() => {}}
						>
							<MenuItem
								key={t('Choose a status')}
								onClick={() => {
									addChips('status', { label: t('Choose a status'), value: t('Choose a status') });
								}}
								value={t('Choose a status')}
							>
								<span style={{ color: theme.palette.grey[100] }}>{t('Choose a status')}</span>
							</MenuItem>
							{CheckStatuses.map((c) => {
								return (
									<MenuItem
										key={c.value}
										onClick={() => {
											addChips('status', { label: c.label, value: c.value.toString() });
										}}
										value={c.value}
									>
										{t(c.label, c.label)}
									</MenuItem>
								);
							})}
						</SelectAdapter>
					</>

					<>
						<Typography variant="bodySm">{t('accountNumber')}</Typography>
						<SelectAdapter
							defaultValue={inputValue.accountNumber?.value}
							onChange={() => {}}
						>
							<MenuItem
								key={t('Select an account')}
								onClick={() => {
									addChips('accountNumber', {
										label: t('Select an account'),
										value: t('Select an account')
									});
								}}
								value={t('Select an account')}
							>
								<span style={{ color: theme.palette.grey[100] }}> {t('Select an account')}</span>
							</MenuItem>
							{accountNumberList?.map((a) => {
								if (a.isShared) return;
								return (
									<MenuItem
										key={a.accountNumber}
										onClick={() => {
											addChips('accountNumber', {
												label: a.accountNumber.toString(),
												value: a.accountNumber.toString()
											});
										}}
										value={a.accountNumber.toString()}
									>
										{a.accountNumber.toString()}
									</MenuItem>
								);
							})}
						</SelectAdapter>
					</>

					<>
						<Typography variant="bodySm">{t('serial')}</Typography>
						<InputAdapter
							type="number"
							onChange={(val) => {
								addChips('serial', { label: val, value: val });
							}}
							placeholder={t('Enter the check serial')}
							defaultValue={inputValue.serial?.value}
						/>
					</>
					<Grid container>
						<ButtonAdapter
							variant="contained"
							size="medium"
							muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
							onClick={() => filter()}
						>
							{t('confirm')}
						</ButtonAdapter>
					</Grid>
				</Grid>
			</ModalOrBottomSheet>
		</>
	);
}
