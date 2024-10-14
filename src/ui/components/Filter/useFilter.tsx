import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChipsAdapter from 'ui/htsc-components/chipsAdapter';
import { InputValues, Props } from './types';

export default function useFilter({ relatedCustomers, onFilter }: Props) {
	const { t } = useTranslation();

	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState<InputValues>({
		category: { label: t('myself'), value: relatedCustomers[0].customerNumber.toString() },
		status: { label: t('Choose a status'), value: t('Choose a status') },
		accountNumber: {
			label: t('Select an account'),
			value: t('Select an account')
		}
	});

	const filter = () => {
		onFilter({
			accountNumber: Number(inputValue.accountNumber?.value),
			customerNumber: Number(inputValue.category?.value),
			serial: inputValue.serial?.value,
			status: Number(inputValue.status?.value)
		});
		setOpen(false);
	};

	const addChips = (type: keyof InputValues, value: { value: string; label: string }) => {
		setInputValue((prev) => ({ ...prev, [type]: value }));
	};

	const clearChips = (type: keyof InputValues) => {
		const newItems = { ...inputValue };
		delete newItems[type];
		setInputValue(newItems);
		onFilter({
			accountNumber: Number(newItems.accountNumber?.value),
			customerNumber: Number(newItems.category?.value),
			serial: newItems.serial?.value,
			status: Number(newItems.status?.value)
		});
	};

	const generateInputValueView = () => {
		const view = [];
		for (const key in inputValue) {
			if (Object.prototype.hasOwnProperty.call(inputValue, key)) {
				const element = inputValue[key as keyof InputValues];

				if (
					element?.label === t('myself') ||
					element?.label === t('Choose a status') ||
					element?.label === t('Select an account')
				) {
					continue;
				} else {
					view.push(
						<ChipsAdapter
							key={element?.value}
							label={t(element!.label, element!.label)}
							onClick={(e) => {
								e.stopPropagation();
								clearChips(key as keyof InputValues);
							}}
							icon={<CloseIcon sx={{ width: '20px', height: '20px', margin: '0' }} />}
						/>
					);
				}
			}
		}
		return view;
	};

	return { open, setOpen, chips: generateInputValueView(), inputValue, addChips, filter };
}
