import { Grid, Typography } from '@mui/material';
import refreshIcon from 'assets/icon/refresh-alert.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonAdapter from '../ButtonAdapter';
import InputAdapter from '../InputAdapter';
import SvgToIcon from '../SvgToIcon';
import CountDownTimer from '../count-down-timer/CountdownTimer';
import { Props } from './type';

export default function Otp(props: Props) {
	const { maxLength = 8, onChange, helperText, error, label, handleResend, timerInSeconds, defaultValue } = props;
	;
	const { t } = useTranslation();
	const [IsCountDownTimerCounting, setIsCountDownTimerCounting] = useState<boolean>();

	return (
		<>
			<InputAdapter
				muiTextFieldProps={{
					inputProps: { maxLength: maxLength }
				}}
				isRequired
				label={label}
				onChange={(value) => onChange(value)}
				type="number"
				error={error}
				helperText={helperText}
				defaultValue={defaultValue}
			/>

			<Grid
				container
				alignItems={'baseline'}
				gap={8}
				sx={{
					marginTop: '8px'
				}}
			>
				<Typography
					variant="bodySm"
					hidden={!IsCountDownTimerCounting}
				>
					<Grid container>
						{t('timer')}
						<CountDownTimer
							timerInSeconds={timerInSeconds}
							onCountDownStarted={() => {
								setIsCountDownTimerCounting(true);
							}}
							onCountDownEnded={() => {
								setIsCountDownTimerCounting(false);
							}}
						/>
					</Grid>
				</Typography>
				<ButtonAdapter
					size="small"
					onClick={handleResend}
					disabled={IsCountDownTimerCounting}
					endIcon={
						<SvgToIcon
							icon={refreshIcon}
							alt="refresh"
						/>
					}
				>
					{t('sendAgain')}
				</ButtonAdapter>
			</Grid>
		</>
	);
}
