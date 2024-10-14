import { useEffect, useState } from 'react';

import errorIcon from '../../../assets/icon/alerts/error.png';
import infoIcon from '../../../assets/icon/alerts/info.png';
import successIcon from '../../../assets/icon/alerts/success.png';
import warningIcon from '../../../assets/icon/alerts/warning.png';
import { props } from './type';

const iconMap = {
	success: successIcon,
	info: infoIcon,
	warning: warningIcon,
	error: errorIcon
};

export default function AlertIcon(props: props) {
	const { type } = props;
	const [selectedIcon, setSelectedIcon] = useState(errorIcon);

	useEffect(() => {
		setSelectedIcon(iconMap[type] || errorIcon);
	}, [type]);

	return (
		<>
			<img
				style={{ width: '64px', height: '64px' }}
				src={selectedIcon}
				alt={`${type} icon`}
			/>
		</>
	);
}
