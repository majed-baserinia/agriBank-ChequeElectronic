import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';

export default function SelectSignature({
	setSelectedSigniture
}: {
	setSelectedSigniture: Dispatch<SetStateAction<'group' | 'myslef' | undefined>>;
}) {
	const { t, i18n } = useTranslation();
	const theme = useTheme();
	const isMatched = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Grid
			sx={{ padding: isMatched ? '16px' : '40px' }}
			container
			direction={'column'}
			gap={'60px'}
		>
			<Grid
				container
				direction={'column'}
				gap={'8px'}
			>
				<Grid
					container
					sx={{ gap: '8px' }}
				>
					<SvgToIcon
						icon={infoIcon}
						alt="info"
					/>
					<Typography
						variant="bodyLg"
						fontWeight={'bold'}
					>
						{t('IssuerSignature')}
					</Typography>
				</Grid>
				<Typography
					variant="bodySm"
					fontWeight={'medium'}
				>
					{t('selectSignatureText')}
				</Typography>
			</Grid>
			<Grid>
				<Grid
					container
					justifyContent={'space-between'}
					sx={{ padding: '20px 0', minWidth: '300px', cursor: 'pointer' }}
					onClick={() => setSelectedSigniture('myslef')}
				>
					<Grid>
						<Typography
							variant="bodyMd"
							fontWeight={'medium'}
						>
							{t('mySignature')}
						</Typography>
						<Typography
							variant="bodyXs"
							fontWeight={'medium'}
						>
							{t('mySignatureSubText')}
						</Typography>
					</Grid>

					{i18n.dir() === 'ltr' ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
				</Grid>
				<Divider />
				<Grid
					container
					justifyContent={'space-between'}
					sx={{ padding: '20px 0', minWidth: '300px', cursor: 'pointer' }}
					onClick={() => setSelectedSigniture('group')}
				>
					<Grid>
						<Typography
							variant="bodyMd"
							fontWeight={'medium'}
						>
							{t('selectSignatureGroup')}
						</Typography>
						<Typography
							variant="bodyXs"
							fontWeight={'medium'}
						>
							{t('selectSignatureGroupSubText')}
						</Typography>
					</Grid>

					{i18n.dir() === 'ltr' ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
				</Grid>
			</Grid>
		</Grid>
	);
}
