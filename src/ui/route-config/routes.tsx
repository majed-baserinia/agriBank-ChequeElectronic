import { createBrowserRouter } from 'react-router-dom';
import Deactivation from 'ui/pages/Deactivation';
import GuidePage from 'ui/pages/Guide';
import AddReceivers from 'ui/pages/IssueCheck/AddRecievers';
import CheckInfo from 'ui/pages/IssueCheck/CheckInfo';
import OtpCheck from 'ui/pages/IssueCheck/OtpCheck';
import OverView from 'ui/pages/IssueCheck/OverView';
import SelectAccount from 'ui/pages/IssueCheck/SelectAccount';
import PersonalType from 'ui/pages/IssueCheck/PersonalType';
import SignatureGroup from 'ui/pages/IssueCheck/SignatureGroup';
import SignatureRegistration from 'ui/pages/IssueCheck/SignatureRegistration';
import ActivationFirstStep from 'ui/pages/activation/ActivationFirstStep';
import ActivationSecondStep from 'ui/pages/activation/ActivationSecondStep';

import CartableList from 'ui/pages/cartable/CartableList';
import Cashing from 'ui/pages/cartable/Cashing';
import Details from 'ui/pages/cartable/Details';
import GiveBackCheckInitiate from 'ui/pages/cartable/GiveBack/GiveBackCheckInitiate';
import GiveBackCheckOTP from 'ui/pages/cartable/GiveBack/GiveBackCheckOTP';
import GiveBackCheckSignature from 'ui/pages/cartable/GiveBack/GiveBackCheckSignature';
import RejectGiveBackCheckInitiate from 'ui/pages/cartable/RejectGiveBack/RejectGiveBackCheckInitiate';
import RejectGiveBackCheckOTP from 'ui/pages/cartable/RejectGiveBack/RejectGiveBackCheckOTP';
import SelectList from 'ui/pages/cartable/SelectList';
import AddNewReceivers from 'ui/pages/cartable/Transfer/AddNewReceivers';
import ChequeReceiptPreview from 'ui/pages/IssueCheck/ChequeReceiptPreview';
import CheckNewInfo from 'ui/pages/cartable/Transfer/CheckNewInfo';
import OtpTransferConfirmation from 'ui/pages/cartable/Transfer/OtpTransferConfirmation';
import TransferOverView from 'ui/pages/cartable/Transfer/TransferOverView';
import TransferSignatureGroup from 'ui/pages/cartable/Transfer/TransferSignatureGroup';
import SelectHandedOverList from 'ui/pages/handedOvers/SelectHandedOverList';
import HandedOverDetails from 'ui/pages/handedOvers/handedOverDetails';
import HandedOverList from 'ui/pages/handedOvers/handedOverList';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import { paths } from './paths';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, path: paths.Home, element: <HomePage /> },
			{ path: paths.guide, element: <GuidePage /> },
			{
				path: paths.Activation.firstStepPath,
				element: <ActivationFirstStep />
			},
			{
				path: paths.Activation.secondStepPath,
				element: <ActivationSecondStep />
			},
			{
				path: paths.IssueCheck.PersonalTypePath,
				element: <PersonalType />
			},
			{
				path: paths.IssueCheck.SelectAccountPath,
				element: <SelectAccount />
			},
			{
				path: paths.IssueCheck.CheckInfoPath,
				element: <CheckInfo />
			},
			{
				path: paths.IssueCheck.addReceiversPath,
				element: <AddReceivers />
			},
			{
				path: paths.IssueCheck.ChequeReceiptPreview,
				element: <ChequeReceiptPreview />
			},
			{
				path: paths.IssueCheck.SignatureRegistrationPath,
				element: <SignatureRegistration />
			},
			{
				path: paths.IssueCheck.SignatureGroupPath,
				element: <SignatureGroup />
			},
			{
				path: paths.IssueCheck.OverViewPath,
				element: <OverView />
			},
			{
				path: paths.IssueCheck.OtpCheckPath,
				element: <OtpCheck />
			},
			{
				path: paths.cartable.SelectList,
				element: <SelectList />
			},

			{
				path: paths.cartable.CartableList,
				element: <CartableList />
			},
			{
				path: paths.cartable.Details,
				element: <Details />
			},
			{
				path: paths.cartable.Transfer,
				element: <CheckNewInfo />
			},
			{
				path: paths.cartable.AddNewReceivers,
				element: <AddNewReceivers />
			},
			{
				path: paths.cartable.OtpTransferConfirmation,
				element: <OtpTransferConfirmation />
			},
			{
				path: paths.cartable.TransferSignatureGroup,
				element: <TransferSignatureGroup />
			},
			{
				path: paths.cartable.TransferOverView,
				element: <TransferOverView />
			},
			{
				path: paths.cartable.Cashing,
				element: <Cashing />
			},

			{
				path: paths.cartable.GiveBackCheckInitiate,
				element: <GiveBackCheckInitiate />
			},
			{
				path: paths.cartable.GiveBackCheckOTP,
				element: <GiveBackCheckOTP />
			},
			{
				path: paths.cartable.GiveBackCheckSignature,
				element: <GiveBackCheckSignature />
			},
			{
				path: paths.cartable.RejectGiveBackCheckInitiate,
				element: <RejectGiveBackCheckInitiate />
			},
			{
				path: paths.cartable.RejectGiveBackCheckOTP,
				element: <RejectGiveBackCheckOTP />
			},
			{
				path: paths.cartable.RejectGiveBackCheckSignature,
				element: <GiveBackCheckSignature />
			},
			{
				path: paths.HandedOvers.SelectHandedOverList,
				element: <SelectHandedOverList />
			},
			{
				path: paths.HandedOvers.HandedOverList,
				element: <HandedOverList />
			},
			{
				path: paths.HandedOvers.HandedOverDetails,
				element: <HandedOverDetails />
			},
			{
				path: paths.Deactivation,
				element: <Deactivation />
			}
		]
	}
]);

export default router;
