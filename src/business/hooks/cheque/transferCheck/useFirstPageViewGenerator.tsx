import { pushAlert } from 'business/stores/AppAlertsStore';
import { useCartableChecklistData } from 'business/stores/cartableListData/cartableListData';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirstPersonView from 'ui/components/transferCheck/FirstPersonView';
import SecondOrMoreView from 'ui/components/transferCheck/SecondOrMoreView';
import { paths } from 'ui/route-config/paths';
import useInquiryTransferStatus from './useInquiryTransferStatus';
//import UnknownView from 'ui/components/transferCheck/UnknownView';

export default function useFirstPageViewGenerator() {
	const navigate = useNavigate();
	const { selectedCheck, addNewCartableData } = useCartableChecklistData((store) => store);
	const { data: inqueryStatusResponse, mutate: inqueryStatus } = useInquiryTransferStatus();

	const [view, setView] = useState<ReactNode>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (selectedCheck) {
			inqueryStatus(
				{ sayadNo: Number(selectedCheck.dataFromList?.sayadNo), chequeHolderNationalCode: '' },
				{
					onError() {
						// we should show the first view here
						setView(
							<FirstPersonView
								checkData={inqueryStatusResponse}
								setLoading={setLoading}
							/>
						);
					},
					onSuccess(data) {
						addNewCartableData({ selectedCheck: { ...selectedCheck, iquiriedData: data } });

						//check if ther is receivers on the response object and if it is,
						//it means that the fist person already started the transfer and the view should be 2
						if (data.receivers.length > 0) {
							setView(
								<SecondOrMoreView
									checkData={data}
									setLoading={setLoading}
								/>
							);
						} else {
							setView(
								<FirstPersonView
									checkData={inqueryStatusResponse}
									setLoading={setLoading}
								/>
							);
						}
					}
				}
			);
		} else {
			// we should never rich here
			pushAlert({
				type: 'error',
				hasConfirmAction: true,
				messageText: '',
				actions: {
					onCloseModal() {
						navigate(paths.Home);
					},
					onConfirm() {
						navigate(paths.Home);
					}
				}
			});
		}

		// this part needs to implement for the companies
		// TODO: call an api for checking if it is persional or company and if it is first person or not
		//set a time out for the api call and if has no response set the view to <UnknownView  checkData={checkData}/>
	}, []);

	return { view, isLoading: loading, inqueryStatusResponse };
}
