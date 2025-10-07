import useInitialSettingStore from "business/stores/initial-setting-store";
import { useIssueCheckWizardData } from "business/stores/issueCheck/useIssueCheckWizardData";
import { jwtDecode } from "jwt-decode";
import { paths } from "ui/route-config/paths";

const getDecodedToken = (): any => {
	const { settings } = useInitialSettingStore.getState();
	try {
		const currentData: any = useIssueCheckWizardData.getState().selectCheckPage;
		const decoded = jwtDecode(settings?.idToken);
		const givenName =
			decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"] || "";
		const surname = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"] || "";
		const fullNameObligor = `${givenName} ${surname}`.trim();
		return { fullNameObligor, currentData };
	} catch (e) {
		console.error("Invalid JWT:", e);
		return null;
	}
};

export const menuList = {
	personalTypes: [
		{
			id: "1",
			title: "IndividualCheque",
			miniSubtitle: "IndividualRequestSubtitle",
			routeTo: paths.IssueCheck.SelectAccountPath,
			onClick: () => {
				const currentData: any = useIssueCheckWizardData.getState().selectCheckPage;
				const setNewDataToWizard = useIssueCheckWizardData.getState().setNewDataToWizard;

				const { fullNameObligor } = getDecodedToken();
				setNewDataToWizard({
					accountType: "IndividualCheque",
					selectCheckPage: {
						selectedAccount: currentData?.selectedAccount || "",
						selectedCheckbook: currentData?.selectedCheckbook || "",
						selectedSheet: currentData?.selectedSheet || "",
						checkData: currentData?.checkData,
						selectedAccountName: fullNameObligor || ""
					}
				});
			}
		},
		// {
		// 	id: "2",
		// 	title: "CorporateCheque",
		// 	miniSubtitle: "CorporateRequestSubtitle",
		// 	onClick: () => {
		// 		const setNewDataToWizard = useIssueCheckWizardData.getState().setNewDataToWizard;
		// 		setNewDataToWizard({
		// 			accountType: "CorporateCheque"
		// 		});
		// 	}
		// }
	]
};
