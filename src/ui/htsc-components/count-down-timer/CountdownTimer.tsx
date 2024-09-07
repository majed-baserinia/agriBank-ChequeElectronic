import { Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useCountDownTimer } from 'ui/htsc-components/count-down-timer/useCountDownTimer';

export type Props = {
	timerInSeconds: {timer: number} | undefined;
	onCountDownStarted?: () => void;
	onCountDownEnded?: () => void;
};

const CountDownTimer = ({ timerInSeconds, onCountDownStarted, onCountDownEnded }: Props) => {
	const { countDownTimer, setCountDownTimer, isTimerCounting } = useCountDownTimer({
		initialValue: timerInSeconds?.timer,
		onCountDownStarted: onCountDownStarted,
		onCountDownEnded: onCountDownEnded
	});
	const theme = useTheme();
	useEffect(() => {
		if (timerInSeconds === undefined) {
			return;
		}
		setCountDownTimer(timerInSeconds.timer);
	}, [timerInSeconds]);

	return (
		<span
			className={`px-2 ${!isTimerCounting ? 'hidden' : ''}`}
			style={{ color: theme.palette.text.secondary }}
		>
			<Typography variant="bodySm">{beautifyTime(countDownTimer ?? 0)}</Typography>
		</span>
	);
};

const beautifyTime = (time: number): string => {
	let minutes = Math.floor(time / 60).toString();
	let seconds = Math.floor(time % 60).toString();

	if (seconds.length == 1) {
		seconds = '0' + seconds;
	}

	if (minutes.length == 1) {
		minutes = '0' + minutes;
	}

	return `${minutes}:${seconds}`;
};

export default CountDownTimer;
