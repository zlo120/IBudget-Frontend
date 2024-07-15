import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";

export const Search = () => {    
    const [dataDisplayed, setDataDisplayed] = useState("Expense");
    const handleDataTypeChange = (event: SelectChangeEvent) => {
        setDataDisplayed(event.target.value as string);
    }
    const convertDateFormat = (dateString: string): string => {
        const dateParts = dateString.split("/");
        if (dateParts.length !== 3) {
            throw new Error("Invalid date format. Expected dd/MM/yyyy");
        }
        const [day, month, year] = dateParts;
        return `${year}/${month}/${day}`;
    };    
    const dummyDataInit = [
        {ID: 4, Amount: 2000, Tags: "tech", Type: "Expense", Date: "02/05/2024"},
        {ID: 3, Amount: 25, Tags: "food", Type: "Expense", Date: "01/05/2024"},
        {ID: 2, Amount: 1200, Tags: "rent", Type: "Expense", Date: "22/04/2024"},
        {ID: 1, Amount: 20, Tags: "animal food", Type: "Expense", Date: "20/03/2024"}
    ]
    const [dummyData, setDummyData] = useState(dummyDataInit);
    const sortByCategories = ["Amount (Ascending)", "Amount (Descending)", "Date (Ascending)", "Date (Descending)", "Tags (Ascending)", "Tags (Descending)"];
    const [sortByToDisplay, setSortByToDisplay] = useState("Date (Descending)");
    const handleFilterChange = (event: SelectChangeEvent) => {
        setSortByToDisplay(event.target.value as string);
        setDummyData(
            dummyDataInit.sort((a, b) => {
                switch (event.target.value as string) {
                    case "Amount (Ascending)":
                        return a.Amount - b.Amount;
                    case "Amount (Descending)":
                        return b.Amount - a.Amount;
                    case "Date (Ascending)":
                        const dateA: Date = new Date(convertDateFormat(a.Date));
                        const dateB: Date = new Date(convertDateFormat(b.Date));
                        if (dateA < dateB) return -1;
                        return 1;                    
                    case "Date (Descending)":
                        const firstDate: Date = new Date(convertDateFormat(a.Date));
                        const secondDate: Date = new Date(convertDateFormat(b.Date));
                        if (firstDate >= secondDate) return -1;
                        return 1;                                                          
                    case "Tags (Ascending)":
                        const tagA = a.Tags.toUpperCase();
                        const tagB = b.Tags.toUpperCase();
                        if (tagA < tagB) return -1;
                        return 1;             
                    case "Tags (Descending)":
                        const firstTag = a.Tags.toUpperCase();
                        const secondTag = b.Tags.toUpperCase();
                        if (firstTag >= secondTag) return -1;
                        return 1;
                    default:
                        return a.ID - b.ID;
                }
            })
        )
    }

    return (
        <>
            <Typography variant="h4">Search</Typography>            
            <Card>
                <CardContent style={{display: "flex"}}>                     
                    <TextField sx={{mr : 5}} style={{width: "100%"}} id="search_input" label="Tag" variant="standard" placeholder="search by tag"/>                    
                    <div style={{width: "50%", display: "flex"}}>
                        <FormControl fullWidth sx={{mr: 2}}>
                            <InputLabel id="data-type-label">Data Type</InputLabel>
                            <Select
                                labelId="data-type-label"
                                id="data-type"
                                value={dataDisplayed}
                                label="Data Type"
                                onChange={handleDataTypeChange}
                            >
                                <MenuItem value={"Income"}>Income</MenuItem>
                                <MenuItem value={"Expense"}>Expense</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="filter-by-label">Filter</InputLabel>
                            <Select
                                labelId="filter-by-label"
                                id="filter-by"
                                value={sortByToDisplay}
                                label="Data"
                                onChange={handleFilterChange}
                            >
                                {sortByCategories.map((text) => (                                    
                                    <MenuItem value={text}>{text}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </CardContent>
            </Card>

            <TableContainer component={Paper} sx={{mt: 3}}>
                <Table aria-label="search-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Tags</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyData.map((row) => (
                            <TableRow
                                key={row.ID}
                                sx={{'&:last-child td, &:last-child th': { border: 0 }}}
                            >
                                <TableCell>{row.ID}</TableCell>
                                <TableCell>${row.Amount}</TableCell>
                                <TableCell>{row.Tags}</TableCell>
                                <TableCell>{row.Type}</TableCell>
                                <TableCell>{row.Date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}