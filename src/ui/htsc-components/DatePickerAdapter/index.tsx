import { useEffect, useRef, useState } from 'react';
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
import type { Value } from 'react-multi-date-picker';
import Icon from 'react-multi-date-picker/components/icon';
import InputAdapter from '../InputAdapter';
import './styles.css';
import { Props } from './type';

export default function DatePickerAdapter(props: Props) {
	const { t } = useTranslation();
	const appLanguage = useInitialSettingStore((store) => store.settings.language);
	const { label = t('date'), helperText, onChange, error, defaultValue } = props;

	const [value, setValue] = useState<Value>();
	const datepicker = useRef();

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
		}
	}, [defaultValue]);

	const handleInputChange = (val: string) => {
		handleSyncValue(val);
	};

	const handleDatePickerChange = (date: Value) => {
		const val = new DateObject(date! as string).convert(persian, persian_en).format();
		//	setValue(date);
		handleSyncValue(val);
	};

	const handleSyncValue = (val: string) => {
		setValue(val);
		onChange(val);
	};

	return (
		<InputAdapter
			label={label}
			type="date"
			defaultValue={value as string}
			onChange={handleInputChange}
			error={error}
			helperText={helperText}
			endIcon={
				<DatePicker
					ref={datepicker}
					render={<Icon />}
					calendar={appLanguage === 'fa-IR' ? persian_ca : undefined}
					locale={appLanguage === 'fa-IR' ? persian_fa : undefined}
					value={value}
					monthYearSeparator=" "
					inputMode="numeric"
					className="primary rmdp-mobile"
					onChange={(value) => handleDatePickerChange(value)}
					format={'YYYY/MM/DD'}
				/>
			}
		/>
	);
}

{
	/* <DatePicker
				ref={datepicker}
				render={
					<>
					</>
					// <div onClick={() => setOpen(true)} >sdfsdf</div>
				}
				calendar={appLanguage === 'fa-IR' ? persian_ca : undefined}
				locale={appLanguage === 'fa-IR' ? persian_fa : undefined}
				value={value}
				monthYearSeparator=" "
				inputMode="numeric"
				className="primary"
				style={{ width: '100%' }}
				// className="primary rmdp-mobile"

				inputClass={`${error ? 'error' : ''} datepickerInput`}
				hideOnScroll
				calendarPosition={'top-right'}
				placeholder={placeHolder}
				onChange={(value) => handleChange(value)}
				format={'YYYY/MM/DD'}
				onClose={() => setOpen(false)}
				onOpen={open ? () => true : () => false}
			/> */
}
{
	/* <FormHelperText
				error={error}
				sx={{
					paddingRight: settings.language === 'en-GB' ? '16px' : 'unset',
					paddingLeft: settings.language === 'fa-IR' ? '16px' : 'unset'
				}}
			>
				{helperText}
			</FormHelperText> */
}
