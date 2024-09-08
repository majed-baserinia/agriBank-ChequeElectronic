import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
 
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import useIssueChequeFinalize from 'business/hooks/cheque/Digital Cheque/useIssueChequeFinalize';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/issueCheck/dataSteps';

import BasicCheckDetials from 'ui/components/CheckOverview/BasicCheckDetials';
import PersonsList from 'ui/components/CheckOverview/PersonsList';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';
import { menuList } from '../../HomePage/menuList';

export default function OverView() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { isLoading, mutate: finalSubmit } = useIssueChequeFinalize();
	const { overviewData, signitureRequirementData } = useDataSteps((store) => store.steps);

	const handleSubmit = () => {
		finalSubmit(
			{
				issueChequeKey: signitureRequirementData?.issueChequeKey!
			},
			{
				onError: (err) => {
					if (err.status===453 && err.instance === "RemoveRequest") {
						pushAlert({
							type: 'error',
							hasConfirmAction: true,
							messageText: err.detail,
							actions: {
								onCloseModal: () => navigate(paths.Home),
								onConfirm: () => navigate(paths.Home)
							}
						});
					} else{

						pushAlert({ type: 'error', hasConfirmAction: true, messageText: err.detail });
					}
				},
				onSuccess(res) {
					pushAlert({
						type: 'success',
						hasConfirmAction: true,
						messageText: res.message,
						actions: {
							onCloseModal: () => navigate(paths.Home),
							onConfirm: () => navigate(paths.Home)
						}
					});
				}
			}
		);
	};

	// const overviewData: IssueChequeOverView = {
	// 	amount: 212,
	// 	description: 'advdsvds',
	// 	dueDate: '222222',
	// 	reason: 'dsv dsvds',
	// 	recievers: [
	// 		{
	// 			customerType:4,
	// 			name: 'name',
	// 			nationalNo: '321123123',
	// 			shahabNo: '',
	// 			customerTypeDescription: ''
	// 		},
	// 		{
	// 			customerTypeDescription: '',
	// 			customerType: 3,
	// 			name: 'name',
	// 			nationalNo: '321123123',
	// 			shahabNo: '4142'
	// 		},
	// 		{
	// 			customerTypeDescription: '',
	// 			customerType: 2,
	// 			name: 'name',
	// 			nationalNo: '321123123',
	// 			shahabNo: '4142'
	// 		},
	// 		{
	// 			customerTypeDescription: '',
	// 			customerType: 1,
	// 			name: 'name',
	// 			nationalNo: '321123123',
	// 			shahabNo: '4142'
	// 		}
	// 	],
	// 	sayadNo: 3232413.2,
	// 	seri: '21321',
	// 	serial: '324324',
	// 	signers: [
	// 		{
	// 			withdrawalGroups: [
	// 				{
	// 					customerNumber: 3241534135,
	// 					name: 'name'
	// 				},
	// 				{
	// 					customerNumber: 3241534135,
	// 					name: 'name'
	// 				},
	// 				{
	// 					customerNumber: 3241534135,
	// 					name: 'name'
	// 				},
	// 				{
	// 					customerNumber: 3241534135,
	// 					name: 'name'
	// 				}
	// 			],
	// 			groupNumber: 'grupnumber'
	// 		}
	// 	],
	// 	toIBAN: '463543'
	// };

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
							gap={'16px'}
						>
							{!matches ? (
								<Stepper
									list={[
										t('selectCheck'),
										t('checkInfo'),
										t('recivers'),
										t('issueSignature'),
										t('selectSignatureGroup'),
										t('end')
									]}
									active={5}
								/>
							) : null}
							{/* //TODO: fix the problem,  */}
							{/* <CheckOverview overviewData={overviewData} /> */}
							<BasicCheckDetials
								amount={overviewData?.amount}
								description={overviewData?.description}
								dueDate={overviewData?.dueDate}
								sayadNo={overviewData?.sayadNo}
								reason={overviewData?.reasonDescription}
								serialSerie={overviewData?.seri + '/' + overviewData?.serial}
							/>
							<PersonsList
								recievers={overviewData?.recievers}
								signers={overviewData?.signers}
							/>
						</Grid>

						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
								onClick={() => handleSubmit()}
							>
								{t('register')}
							</ButtonAdapter>
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
						<Menu
							divider={false}
							list={menuList.management}
						/>
						<Menu
							divider={false}
							list={menuList.services}
						/>
					</BoxAdapter>
				</Grid>
			)}
			<Loader showLoader={!overviewData || isLoading} />
		</Grid>
	);
}
