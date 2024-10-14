import { Divider, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from './MenuItem';
import { Props } from './type';

export default function Menu(props: Props) {
	const { list, menuTitle, divider = true } = props;
	const { t } = useTranslation();

	return (
		<Grid overflow={'hidden'}>
			<Typography
				variant="bodyLg"
				fontWeight={'bold'}
			>
				{t(menuTitle!, menuTitle as string)}
			</Typography>
			{list?.map((item, index) => {
				return (
					<Fragment key={item.title}>
						<MenuItem
							{...item}
							key={index}
						/>

						{divider ? list?.length - 1 == index ? null : <Divider /> : null}
					</Fragment>
				);
			})}
		</Grid>
	);
}
