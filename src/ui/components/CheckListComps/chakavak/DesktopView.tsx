import { useHandedOversData } from 'business/stores/handedOverChecks/useHandedOversStore';
import { chakavakCheck } from 'common/entities/cheque/chekList/ChakavakGetEChequeList/ChakavakGetEChequeListResponse';
import { formatAmount } from 'common/utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import ChipStatusAdapter from 'ui/htsc-components/ChipStatusAdapter';
import TableAdapter from 'ui/htsc-components/TableAdapter/TableAdapter';
import { paths } from 'ui/route-config/paths';
import { rowType } from './types';

export default function DesktopView({ list }: { list?: chakavakCheck[] }) {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [checkRows, setCheckRows] = useState<rowType>();
	const { addNewStoreData } = useHandedOversData((store) => store);

	useEffect(() => {
		const rows = list?.map((check) => {
			return {
				//id: check.clearId.toString(),
				status: (
					<ChipStatusAdapter
						size="small"
						type={'info'}
						label={check.chqStatusDesc}
					/>
				),
				serial: check.serial,
				amount: formatAmount(check.amount.toString()),
				date: check.chequeDate,
				action: (
					<ButtonAdapter
						size="small"
						variant="text"
						onClick={() => {
							addNewStoreData({ detailsPage: { check: check } });
							navigate(paths.HandedOvers.HandedOverDetails);
						}}
						forwardIcon
					>
						{t('details')}
					</ButtonAdapter>
				)
			};
		});
		setCheckRows(rows);
	}, [list]);

	return (
		<TableAdapter
			columns={[
				//{ id: 'id', label: 'clearId', minWidth: 70 },
				{ id: 'status', label: 'status', minWidth: 70 },
				{ id: 'serial', label: 'serial', minWidth: 70 },
				{ id: 'amount', label: 'amount', minWidth: 70 },
				{ id: 'date', label: 'date', minWidth: 70 },
				{ id: 'action', label: '', minWidth: 70, align: 'right' }
			]}
			rowsData={checkRows}
		/>
	);
}
