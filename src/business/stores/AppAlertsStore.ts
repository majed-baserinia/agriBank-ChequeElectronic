import { AppAlert } from 'ui/htsc-components/alerts/type';
import create from 'zustand';

const state: { alerts: AppAlert[] } = { alerts: [] };

const useAlert = create(() => state);

//const alerts = useAlert.getState().alerts;

const pushAlert = (newAlert: AppAlert) => {
	useAlert.setState((prev) => ({ alerts: [...prev.alerts, { ...newAlert }] }));
};

const clearAlert = () => {
	useAlert.setState(() => ({ alerts: [] }));
};

export { clearAlert, pushAlert, useAlert };
