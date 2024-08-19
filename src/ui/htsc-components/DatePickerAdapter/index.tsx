import { FormHelperText, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { default as persian, default as persian_ca } from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useTranslation } from 'react-i18next';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/backgrounds/bg-brown.css';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';
import 'react-multi-date-picker/styles/backgrounds/bg-gray.css';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import 'react-multi-date-picker/styles/layouts/prime.css';

import useInitialSettingStore from 'business/stores/initial-setting-store';
import './styles.css';
import { Props } from './type';

export default function DatePickerAdapter(props: Props) {
	const { t } = useTranslation();
	const appLanguage = useInitialSettingStore((store) => store.settings.language);
	const { placeHolder = t('date'), helperText, onChange, error } = props;
	const { settings } = useInitialSettingStore((s) => s);

	const [value, setValue] = useState<DateObject | DateObject[] | null>(null);
	const datepicker = useRef();

	const handleChange = (date: DateObject | DateObject[] | null) => {
		const val = new DateObject(date as DateObject).convert(persian, persian_en).format();

		setValue(date);
		onChange(val);
	};

	return (
		<div className="page-wrapper">
			<DatePicker
				ref={datepicker}
				calendar={appLanguage === 'fa-IR' ? persian_ca : undefined}
				locale={appLanguage === 'fa-IR' ? persian_fa : undefined}
				value={value}
				monthYearSeparator=" "
				className="primary"
				style={{ width: '100%' }}
				// className="primary rmdp-mobile"

				inputClass={`${error ? 'error' : ''} datepickerInput`}
				hideOnScroll
				calendarPosition={'bottom-right'}
				placeholder={placeHolder}
				onChange={(value) => handleChange(value)}
				format={'YYYY/MM/DD'}
			/>
			<FormHelperText
				error={error}
				sx={{
					paddingRight: settings.language === 'en-GB' ? '16px' : 'unset',
					paddingLeft: settings.language === 'fa-IR' ? '16px' : 'unset'
				}}
			>
				{helperText}
			</FormHelperText>
		</div>
	);
}
