import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BottomSheetActionButton, { checkActionsMenuList } from 'ui/components/CheckListComps/BottomSheetActionButton';
import { AllowedNumbers } from 'ui/components/CheckListComps/types';
import BasicCheckDetials from 'ui/components/CheckOverview/BasicCheckDetials';
import CheckStatus from 'ui/components/CheckOverview/CheckStatus';
import Menu from 'ui/components/Menu';
 
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import Loader from 'ui/htsc-components/loader/Loader';

export default function TransferredCheckDetail() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { selectedCheck } = useChecklistData((store) => store);

	return (
		<Grid
			container
			sx={{ padding: matches ? '0' : '64px 0' }}
			justifyContent={'center'}
			gap={'24px'}
			dir={theme.direction}
		>
			<Grid
				item
				xs={12}
				md={8}
			>
				<BoxAdapter fullWidth={matches}>
					<Grid
						minHeight={matches ? 'calc(100vh - 64px)' : 'calc(100vh - 192px)'}
						container
						direction={'column'}
						justifyContent={'space-between'}
						wrap="nowrap"
					>
						<Grid
							container
							direction={'column'}
							gap={'8px'}
						>

							<CheckStatus
								checkBlockingStatus={selectedCheck?.blockStatusDescription}
								checkGuaranteeStatus={selectedCheck?.guaranteeStatusDescription}
								checkStatus={selectedCheck?.chequeStatus as AllowedNumbers}
							/>
							<Typography
								align={matches ? 'center' : 'inherit'}
								variant="bodyMd"
								fontWeight={'bold'}
								color={theme.palette.grey[700]}
							>
								{t('sayadCheckInquery')}
							</Typography>

							{/* //TODO: send the data to overview component */}
							<Grid>
								<BasicCheckDetials
									amount={selectedCheck?.amount}
									description={selectedCheck?.description}
									dueDate={selectedCheck?.dueDate}
									sayadNo={selectedCheck?.sayadNo}
									reason={selectedCheck?.reasonDescription}
									serialSerie={selectedCheck?.seriesNo + '/' + selectedCheck?.serialNo}
								/>
								{/* <PersonsList
									recievers={selectedCheck?.}
									signers={overviewData?.signers}
								/> */}
							</Grid>
						</Grid>

						<Grid container>
							{matches && selectedCheck ? <BottomSheetActionButton check={selectedCheck} /> : null}
						</Grid>
					</Grid>
				</BoxAdapter>
			</Grid>
			{matches ? null : (
				<Grid
					item
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<Menu list={checkActionsMenuList} />
					</BoxAdapter>
				</Grid>
			)}
			<Loader showLoader={false} />
		</Grid>
	);
}
