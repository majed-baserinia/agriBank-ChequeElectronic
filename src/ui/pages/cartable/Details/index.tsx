import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';
import BottomSheetActionButton, {
	checkActionsMenuList
} from 'ui/components/CheckListComps/cartable/BottomSheetActionButton';
import PersonsList from 'ui/components/CheckOverview/PersonsList';
import Menu from 'ui/components/Menu';
import NewCheckInfoAdvance from 'ui/components/NewCheckInfoAdvance';
import NewCheckInfoBasics from 'ui/components/NewCheckInfoBasics';

import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import Loader from 'ui/htsc-components/loader/Loader';

export default function Details() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { selectedCheck, transferOverview } = useCartableChecklistData((store) => store);

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
				<BoxAdapter
					fullWidth={matches}
					muiPaperProps={{
						sx: {
							minWidth: '25%',
							borderRadius: matches ? 0 : '32px',
							padding: '16px'
						}
					}}
				>
					<Grid
						minHeight={matches ? 'calc(100vh - 32px)' : 'calc(100vh - 192px)'}
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
							<Grid>
								{selectedCheck ? (
									<>
										<NewCheckInfoBasics
											hasTitle
											checkData={{
												amount: selectedCheck.dataFromList?.amount.toString()!,
												description: selectedCheck.dataFromList?.description!,
												date: selectedCheck.dataFromList?.dueDate!,
												sayad: selectedCheck.dataFromList?.sayadNo.toString()!,
												reason: selectedCheck.dataFromList?.reasonDescription!,
												serie: selectedCheck.dataFromList?.seriesNo!,
												serial: selectedCheck.dataFromList?.serialNo!,
												checkStatus: selectedCheck.dataFromList?.chequeStatusDescription
											}}
										/>

										<NewCheckInfoAdvance
											checkData={{
												bankCode: selectedCheck.dataFromList?.bankCode!,
												branchCode: selectedCheck.dataFromList?.branchCode!,
												checkType: selectedCheck.dataFromList?.chequeTypeDescription!,
												dueDate: selectedCheck.dataFromList?.dueDate!,
												lockStatus: selectedCheck.dataFromList?.lockedDescription!,
												sharedStatus: selectedCheck.dataFromList?.sharedDescription!
											}}
										/>
									</>
								) : null}
								<PersonsList
									recievers={transferOverview?.transferChequeOverView.recievers}
									signers={transferOverview?.transferChequeOverView.signers}
								/>
							</Grid>
						</Grid>

						<Grid container>
							{matches && selectedCheck ? (
								<BottomSheetActionButton checkData={selectedCheck.dataFromList!} />
							) : null}
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
