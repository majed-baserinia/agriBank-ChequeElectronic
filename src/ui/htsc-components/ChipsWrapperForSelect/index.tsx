import { ReactNode } from 'react';

export default function ChipsWrapperForSelect(props: { children: ReactNode[] }) {
	const { children } = props;
	return (
		<div
			className="clickedNotClose"
			style={{ margin: '5px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}
		>
			{children}
		</div>
	);
}
