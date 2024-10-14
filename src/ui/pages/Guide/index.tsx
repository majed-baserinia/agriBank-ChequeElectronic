import { Divider, Grid } from '@mui/material';
import AccordionAdapter from 'ui/htsc-components/AccordionAdapter';
const questions = [
	{
		details: (
			<div style={{ marginTop: '16px' }}>
				<Divider />
				test content
			</div>
		),
		summery: 'test'
	},
	{
		details: (
			<div style={{ marginTop: '8px' }}>
				<Divider />
				<div style={{ marginTop: '16px' }}>test content</div>
			</div>
		),
		summery: 'test'
	},
	{
		details: (
			<div style={{ marginTop: '16px' }}>
				<Divider />
				test content
			</div>
		),
		summery: 'test'
	}
];
export default function GuidePage() {
	return (
		<Grid sx={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
			{questions.map((q) => {
				return (
					<AccordionAdapter
						key={q.details.key}
						id="1"
						details={q.details}
						summery={q.summery}
					/>
				);
			})}
		</Grid>
	);
}
