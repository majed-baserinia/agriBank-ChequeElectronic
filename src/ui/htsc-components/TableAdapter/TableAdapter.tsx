import { CircularProgress, Grid, TableCell, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Props } from './type';

export default function TableAdapter<TColumnNames extends string>({ columns, rowsData }: Props<TColumnNames>) {
	const { t } = useTranslation();
	const rowsPerPage = useRef(50);
	const [page, setPage] = useState(0);
	//const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (_: unknown, newPage: number) => {
		setPage(newPage);
	};

	// const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
	// 	setRowsPerPage(+event.target.value);
	// 	setPage(0);
	// };

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 590 }}>
				<Table
					stickyHeader
					aria-label="sticky table"
				>
					<TableHead>
						<TableRow>
							{columns.map((column, index) => (
								<TableCell
									key={index}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									<Typography
										variant="bodyMd"
										fontWeight={'bold'}
									>
										{column.label != '' ? t(column.label, column.label) : ''}
									</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rowsData
							?.slice(page * rowsPerPage.current, page * rowsPerPage.current + rowsPerPage.current)
							.map((row, index) => {
								return (
									<TableRow
										tabIndex={-1}
										key={index}
									>
										{columns.map((column, index) => {
											const value = row[column.id];
											return (
												<TableCell
													key={index}
													align={column.align}
												>
													<Typography variant="bodyMd">{value}</Typography>
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
				{!rowsData ? (
					<Grid
						sx={{ width: '100%' }}
						container
						alignContent={'center'}
						justifyContent={'center'}
					>
						<CircularProgress size={'32px'} />
					</Grid>
				) : null}
			</TableContainer>
			{rowsData && rowsData.length > 1 ? (
				<TablePagination
					rowsPerPageOptions={[rowsPerPage.current]}
					component="div"
					count={rowsData.length}
					rowsPerPage={rowsPerPage.current}
					page={page}
					onPageChange={handleChangePage}
					labelDisplayedRows={() => ''}
					//	onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			) : null}
		</Paper>
	);
}
