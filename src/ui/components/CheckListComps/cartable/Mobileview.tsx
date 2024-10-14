import { Grid } from '@mui/material';
import { Check } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { useTranslation } from 'react-i18next';
import Loader from 'ui/htsc-components/loader/Loader';
import CheckItemCard from './CheckItemCard';

export default function MobileView({ list }: { list?: Check[] }) {
	const { t } = useTranslation();

	return (
		<Grid
			container
			justifyContent={'center'}
			gap={'16px'}
		>
			{list?.length
				? list?.map((check) => (
						<CheckItemCard
							key={check.sayadNo}
							check={check}
						/>
					))
				: t('thereIsNoChecksToShow')}
			<Loader showLoader={!list} />
		</Grid>
	);
}
