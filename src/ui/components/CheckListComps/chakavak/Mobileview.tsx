import { Grid } from '@mui/material';
import { chakavakCheck } from 'common/entities/cheque/chekList/ChakavakGetEChequeList/ChakavakGetEChequeListResponse';
import { useTranslation } from 'react-i18next';
import { useLoadingHandler } from "@agribank/ui/components/Loader";
import CheckItemCard from './CheckItemCard';

export default function MobileView({ list }: { list?: chakavakCheck[] }) {
	const { t } = useTranslation();
	useLoadingHandler(!list);

	return (
		<Grid
			container
			justifyContent={'center'}
			gap={'16px'}
		>
			{list?.length
				? list?.map((check) => (
					<CheckItemCard
						key={check.clearId}
						check={check}
					/>
				))
				: t('thereIsNoChecksToShow')}
		</Grid>
	);
}
