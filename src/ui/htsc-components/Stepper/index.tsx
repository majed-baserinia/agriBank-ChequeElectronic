import { Typography, useTheme } from '@mui/material';
import acticeIcon from 'assets/icon/stepper/active.svg';
import completedIcon from 'assets/icon/stepper/completed.svg';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';

import { Props } from './types';

export default function Stepper(props: Props) {
	const { list, active } = props;
	const theme = useTheme();

	const activeIconRnderer = (text: number) => (
		<div className="relative h-8 w-8">
			<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-base text-white	">
				<Typography variant="bodySm">{text}</Typography>
			</span>
			<img
				src={acticeIcon}
				alt="active icon"
			/>
		</div>
	);

	return (
		<div className="mb-10">
			<ul className="relative flex flex-row   p-5">
				{list?.map((item, index) => {
					return (
						<li
							key={index}
							className={`group flex flex-1  shrink ${
								index + 1 == list.length ? 'basis-0' : 'basis-full'
							} items-center `}
						>
							<span className="group  flex min-h-7 min-w-7 flex-col items-center gap-y-3 text-center text-xs">
								{index < active ? (
									<SvgToIcon
										icon={completedIcon}
										alt="completed icon"
										height="32px"
										width="32px"
									/>
								) : index === active ? (
									activeIconRnderer(index + 1)
								) : (
									<span
										className="flex size-8 flex-shrink-0  items-center justify-center rounded-full font-medium"
										style={{ backgroundColor: theme.palette.grey[50] }}
									>
										<span className="text-base">
											<Typography variant="bodySm">{index + 1}</Typography>
										</span>
									</span>
								)}
								<span className="min-w-20 text-center text-sm font-medium">
									<Typography
										color={theme.palette.primary.main}
										variant="bodySm"
										fontWeight={index === active ? 'bold' : undefined}
									>
										{item}
									</Typography>
								</span>
							</span>
							<div
								className=" mb-8 w-full flex-1 rounded  group-last:hidden"
								style={{
									backgroundColor:
										index < active ? theme.palette.success.main : theme.palette.grey[100],
									height: index < active ? '4px' : '1px'
								}}
							></div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
