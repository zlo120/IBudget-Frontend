import { Chip, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Submit from "./submit";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { allCsvDataAtom, distinctDescriptionsAtom, newEntriesAtom, newRulesAtom, stepAtom, untaggedDescriptionsAtom } from "../../../../app/routes/app/uploadcsv";
import { useState } from "react";

type ReviewEntry = {
    entry: string,
    tags: string[]
}

const ReviewData = () => { 
    const rows = [
        {entry: "K-Fresh", tags: ["Grocery", "Optional"]},
        {entry: "Kmart", tags: ["Optional"]},
        {entry: "Big W", tags: ["Grocery", "Optional"]},
        {entry: "Coles Express", tags: ["Petrol", "Optional"]},
        {entry: "Stock Exchange Hotel", tags: ["Essentials"]},
    ];
 
    const setStep = useSetAtom(stepAtom);
    const untaggedDescriptions = useAtomValue(untaggedDescriptionsAtom);   
    const distinctDescriptions = useAtomValue(distinctDescriptionsAtom);
    const newEntries = useAtomValue(newEntriesAtom);
    const newRules = useAtomValue(newRulesAtom);

    let descriptionTags: Map<string, string[]> = new Map();
    for (let i = 0; i < distinctDescriptions.length; i++) {
        // check if the description has an entry
        for (let j = 0; j < newEntries.length; j++) {
            if (distinctDescriptions[i].toLocaleLowerCase() === newEntries[j].captures.toLocaleLowerCase()) {
                descriptionTags.set(distinctDescriptions[i], newEntries[j].tags);
                break;
            }
        }
        if (descriptionTags.has(distinctDescriptions[i])) continue;
        // check if a rule captures this description
        for (let j = 0; j < newRules.length; j++) {
            if (distinctDescriptions[i].toLocaleLowerCase().includes(newRules[j].rule.toLocaleLowerCase())) {
                descriptionTags.set(distinctDescriptions[i], newRules[j].tags);
                break;
            }
        }
    }

    if (untaggedDescriptions.length > 0) setStep(1);

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
                    {distinctDescriptions.map((description) => (
                        <TableRow
                        key={description}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {description}
                        </TableCell>
                        <TableCell>
                            {
                                descriptionTags.get(description)?.map((tag) => (
                                    <Chip label={tag} style={{marginRight: "5px"}}/>
                                ))
                            }
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