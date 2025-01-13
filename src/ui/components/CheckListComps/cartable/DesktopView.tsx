import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';
import { Check } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { formatAmount } from 'common/utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import ChipStatusAdapter from 'ui/htsc-components/ChipStatusAdapter';
import TableAdapter from 'ui/htsc-components/TableAdapter/TableAdapter';
import { paths } from 'ui/route-config/paths';
import { rowType } from '../types';

export default function DesktopView({ list }: { list?: Check[] }) {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [checkRows, setCheckRows] = useState<rowType>();
	const { addNewCartableData, selectedCheck } = useCartableChecklistData((store) => store);


	useEffect(() => {
		const rows = list?.map((check) => {
			return {
				sayadNumber: check.sayadNo.toString(),
				status: (
					<ChipStatusAdapter
						size="small"
						type={'info'}
						label={check.chequeStatusDescription}
					/>
				),
				serieAndSerial: check.seriesNo + '/' + check.serialNo,
				amount: formatAmount(check.amount.toString()),
				reason: check.reasonDescription,
				date: check.dueDate,
				lockStatus:check?.locked ? t("has-lock") : t("no-lock"),
				action: (
					<ButtonAdapter
						size="small"
						variant="text"
						onClick={() => {
							addNewCartableData({ selectedCheck: { ...selectedCheck, dataFromList: check } });
							navigate(paths.cartable.Details);
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
				{ id: 'sayadNumber', label: 'sayadNumber', minWidth: 70 },
				{ id: 'status', label: 'status', minWidth: 70 },
				{ id: 'serieAndSerial', label: 'serieAndSerial', minWidth: 70 },
				{ id: 'amount', label: 'amount', minWidth: 70 },
				{ id: 'reason', label: 'reason', minWidth: 70 },
				{ id: 'date', label: 'date', minWidth: 70 },
				{ id: 'lockStatus', label: 'lockStatus', minWidth: 70 },
				{ id: 'action', label: '', minWidth: 70, align: 'right' }
			]}
			rowsData={checkRows}
		/>
	);
}
