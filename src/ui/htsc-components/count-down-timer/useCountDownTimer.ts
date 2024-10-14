import { useEffect, useRef, useState } from 'react';

export type CountDownTimerProps = {
	initialValue: number | undefined; // what timer should start with
	minTimerValue?: number; // when timer should stop counting down and clear the interval
	onCountDownStarted?: () => void; // when countdown has started
	onCountDownEnded?: () => void; // when we clear the interval and stop counting
};

export const useCountDownTimer = ({
	initialValue,
	minTimerValue = 0,
	onCountDownStarted,
	onCountDownEnded
}: CountDownTimerProps) => {
	const [countDownTimer, setCountDownTimer] = useState(initialValue ?? minTimerValue - 1);
	const intervalId = useRef<NodeJS.Timeout | undefined>(undefined);

	useEffect(() => {
		createIntervalIfRequired();
		return () => clearIntervalIfRequired();
	}, [countDownTimer]);

	const createIntervalIfRequired = () => {
		if (countDownTimer < minTimerValue) {
			return;
		}

		// don't create the interval if we already have it
		if (intervalId.current !== undefined) {
			return;
		}

		onCountDownStarted?.();

		const createdIntervalId = setInterval(() => {
			setCountDownTimer((previousValue) => {
				return previousValue - 1;
			});
		}, 1000);

		intervalId.current = createdIntervalId;
	};

	const clearIntervalIfRequired = () => {
		if (countDownTimer > minTimerValue) {
			return;
		}

		if (intervalId.current == undefined) {
			return;
		}

		onCountDownEnded?.();

		clearInterval(intervalId.current);

		intervalId.current = undefined;
	};

	return {
		countDownTimer: countDownTimer,
		setCountDownTimer: setCountDownTimer,
		isTimerCounting: countDownTimer >= minTimerValue
	};
};
