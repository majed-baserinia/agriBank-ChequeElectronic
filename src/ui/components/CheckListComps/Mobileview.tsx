import { Grid } from '@mui/material';
import { CartableInquiryResponse } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { useTranslation } from 'react-i18next';
import Loader from 'ui/htsc-components/loader/Loader';
import CheckItemCard from './CheckItemCard';

export default function MobileView({ cartableList }: { cartableList?: CartableInquiryResponse }) {
	const { t } = useTranslation();
	
	return (
		<Grid
			container
			justifyContent={'center'}
			gap={'16px'}
		>
			{cartableList?.cheques.length
				? cartableList?.cheques.map((check) => (
						<CheckItemCard
							key={check.sayadNo}
							check={check}
						/>
					))
				: t('thereIsNoChecksToShow')}
			<Loader showLoader={!cartableList} />
		</Grid>
	);
}
