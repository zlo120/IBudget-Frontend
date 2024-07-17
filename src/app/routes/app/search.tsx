import { Autocomplete, Card, CardContent, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TablePagination, TextField, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { RowData } from "../../../models/RowData";
import { useSearchAllData, useSearchThisWeekData, useTagQuery } from "../../../api/api";

export const Search = () => {     
    const searchQuery = useSearchAllData();
    const [client, tagQuery] = useTagQuery();    
    const thisWeeksOnlySearchQuery = useSearchThisWeekData();

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [dataDisplayed, setDataDisplayed] = useState("Expense");
    const [isThisWeekOnly, setIsThisWeekOnly] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [sortByToDisplay, setSortByToDisplay] = useState("Date (Descending)");  
    
    const sortByCategories = ["Amount (Ascending)", "Amount (Descending)", "Date (Ascending)", "Date (Descending)"];

    const handleThisWeekOnlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsThisWeekOnly(event.target.checked);
    }
    const handleDataTypeChange = (event: SelectChangeEvent) => {
        setDataDisplayed(event.target.value as string);
    }
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }
    const handleFilterChange = (event: SelectChangeEvent) => {
        setSortByToDisplay(event.target.value as string);
        searchQuery.data.allExpenses.sort((a: RowData, b: RowData) => {
            switch (event.target.value as string) {
                case "Amount (Ascending)":
                    return a.amount - b.amount;
                case "Amount (Descending)":
                    return b.amount - a.amount;
                case "Date (Ascending)":
                    const dateA: Date = new Date(convertDateFormat(a.date));
                    const dateB: Date = new Date(convertDateFormat(b.date));
                    if (dateA < dateB) return -1;
                    return 1;                    
                case "Date (Descending)":
                    const firstDate: Date = new Date(convertDateFormat(a.date));
                    const secondDate: Date = new Date(convertDateFormat(b.date));
                    if (firstDate >= secondDate) return -1;
                    return 1;
                default:
                    return a.id - b.id;
            }
        })
    }
    const convertDateFormat = (dateString: string): string => {
        return dateString.replaceAll("-", "/");
    };

    if (searchQuery.isPending || thisWeeksOnlySearchQuery.isPending) return <><Typography variant="h4">Loading...</Typography></>
    if (searchQuery.error) return <><Typography variant="h4">An error has occured when querying all the data: {searchQuery.error.message}</Typography></>
    if (thisWeeksOnlySearchQuery.error) return <><Typography variant="h4">An error has occured when querying this week's data: {thisWeeksOnlySearchQuery.error.message}</Typography></>

    return (
        <>
            <Typography variant="h4">Search</Typography>            
            <Card>
                <CardContent style={{display: "flex"}}>
                    <Autocomplete
                        multiple
                        sx={{mr : 5}} 
                        style={{width: "100%"}} 
                        id="search_input" 
                        options={client.getQueryData(['allTags', 1]) as string[]}
                        filterSelectedOptions
                        onChange={(event, value) => setSelectedTags(value as string[])}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Search by tag"
                            placeholder="Tag name"
                        />
                        )}
                    />
                    <div style={{width: "60%", display: "flex", alignContent: "center", alignItems: "center"}}>
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
                        <FormControl fullWidth sx={{mr: 2}}>
                            <InputLabel id="filter-by-label">Sort</InputLabel>
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
                        <FormControl fullWidth>
                            <FormControlLabel control={<Switch onChange={handleThisWeekOnlyChange}/>} label="This Week Only" />
                        </FormControl>
                    </div>
                </CardContent>
            </Card>
            <TableContainer component={Paper} sx={{mt: 3, maxHeight: "60vh", overflow: "scroll", }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Tags</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { isThisWeekOnly ? thisWeeksOnlySearchQuery.data.allExpenses
                                .map((row: RowData) => {
                                    if (selectedTags.length === 0) return row
                                    for (let i = 0; i < selectedTags.length; i++) {
                                        if (row.tags.includes(selectedTags[i])) {
                                            return row;
                                        }
                                    }
                                })
                                .filter((row: RowData) => row !== undefined)
                                .slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage)
                                .map((row: RowData) => 
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': { border: 0 }}}
                                    >
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>${row.amount}</TableCell>
                                        <TableCell>{row.tags.map((tag) => (
                                                <Chip label={tag} style={{marginRight: "5px"}}/>
                                            ))}
                                        </TableCell>
                                        <TableCell>{row.date}</TableCell>
                                    </TableRow>
                                )
                                // else
                                : searchQuery.data.allExpenses
                                .map((row: RowData) => {
                                    if (selectedTags.length === 0) return row
                                    for (let i = 0; i < selectedTags.length; i++) {
                                        if (row.tags.includes(selectedTags[i])) {
                                            return row;
                                        }
                                    }
                                })
                                .filter((row: RowData) => row !== undefined)
                                .slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage)
                                .map((row: RowData) => 
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': { border: 0 }}}
                                    >
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>${row.amount}</TableCell>
                                        <TableCell>{row.tags.map((tag) => (
                                                <Chip label={tag} style={{marginRight: "5px"}}/>
                                            ))}
                                        </TableCell>
                                        <TableCell>{row.date}</TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            <TablePagination
                rowsPerPageOptions={[15, 25, 50]}
                component="div"
                count={isThisWeekOnly ? thisWeeksOnlySearchQuery.data.allExpenses.length : searchQuery.data.allExpenses.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}