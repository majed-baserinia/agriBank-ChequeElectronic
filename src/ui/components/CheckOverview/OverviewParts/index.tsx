import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChipsAdapter from 'ui/htsc-components/chipsAdapter';
import { HolderData, Props, ReceiverData, SignerData } from './type';

export default function OverviewParts(props: Props) {
	const { type } = props;
	const [data, setData] = useState<ReceiverData | SignerData | HolderData>();

	useEffect(() => {
		if (type === 'signer') setData(props.signerData);
		if (type === 'receiver') setData(props.receiverData);
		if (type === 'holder') setData(props.holderData);
	}, []);

	const ViewGenerator = (type: 'signer' | 'receiver' | 'holder') => {
		if (type === 'signer') return <SignerComp {...(data as SignerData)} />;
		if (type === 'receiver') return <ReceiverComp {...(data as ReceiverData)} />;
		if (type === 'holder') return <HolderComponent {...(data as HolderData)} />;
	};

	return (
		<Grid
			container
			direction={'column'}
			justifyContent={'space-between'}
			alignItems={'start'}
			sx={{ padding: '16px' }}
		>
			{props.type === 'holder' && props.holderData ? (
				<Grid container>
					<Typography variant="bodyMd">{data?.name}</Typography>
					<ChipsAdapter
						label={(data as HolderData).acceptTransfer! === 0 ? t('awaitingConfirmation') : t('confirmed')}
						color={(data as HolderData).acceptTransfer! === 0 ? "info" : "success"}
						size="small"
					/>
				</Grid>
			) : (
				<Typography variant="bodyMd">{data?.name}</Typography>
			)}
			<Grid
				container
				gap={'4px'}
				justifyContent={'start'}
			>
				{ViewGenerator(type)}
			</Grid>
		</Grid>
	);
}

const SignerComp = (props: SignerData) => {
	const { customerNumber } = props;
	return (
		<>
			<Typography variant="bodyXs">{t('iDCodeCol')}</Typography>
			<Typography variant="bodyXs">{customerNumber}</Typography>
		</>
	);
};

const ReceiverComp = (props: ReceiverData) => {
	const { customerType, nationalNo, shahabNo } = props;
	const { t } = useTranslation();

	const customerTypeMap: { [key: number]: string } = {
		1: t('nationalIdCol'),
		2: t('nationalIdCol'),
		3: t('universalIDCol'),
		4: t('nationalIdCol')
	};

	return (
		<>
			<Typography variant="bodyXs">{customerTypeMap?.[customerType]}</Typography>
			<Typography variant="bodyXs">{nationalNo}</Typography>
			{shahabNo && (
				<>
					<Typography variant="bodyXs">{t('ShahabCodeTCol')}</Typography>
					<Typography variant="bodyXs">{shahabNo}</Typography>{' '}
				</>
			)}
		</>
	);
};

const HolderComponent = (props: HolderData) => {
	const { nationalNo } = props;
	return (
		<>
			<Typography variant="bodyXs">{t('iDCodeCol')}</Typography>
			<Typography variant="bodyXs">{nationalNo}</Typography>
		</>
	);
};
