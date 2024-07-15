import { Chip, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Submit from "./submit";

const ReviewData = () => { 
    const rows = [
        {entry: "K-Fresh", tags: ["Grocery", "Optional"]},
        {entry: "Kmart", tags: ["Optional"]},
        {entry: "Big W", tags: ["Grocery", "Optional"]},
        {entry: "Coles Express", tags: ["Petrol", "Optional"]},
        {entry: "Stock Exchange Hotel", tags: ["Essentials"]},
    ]
    return (
        <>
            <Typography variant="h5">Reviewing Tagged Entries</Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Entry</TableCell>
                        <TableCell>Tags</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.entry}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.entry}
                        </TableCell>
                        <TableCell>
                            {row.tags.map((tag) => (
                                <Chip label={tag} style={{marginRight: "5px"}}/>
                            ))}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Submit buttonText="Complete" />
        </>
    )
}

export default ReviewData;