import { Chip, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Submit from "./submit";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { allCsvDataAtom, distinctUntaggedDescriptionsAtom, newEntriesAtom, newRulesAtom, stepAtom, untaggedDescriptionsAtom } from "../../../../app/routes/app/uploadcsv";
import styles from "./uploadcsv.styles";
import { useUploadCsvData } from "../../../../api/api";
import { useEffect } from "react";

const useStyles = styles;
export const descriptionTagsMapAtom = atom<Map<string, string[]>>(new Map());
export const isCompleteAtom = atom<boolean>(false);

const ReviewData = () => { 
    const {classes} = useStyles();
 
    const setStep = useSetAtom(stepAtom);
    const untaggedDescriptions = useAtomValue(untaggedDescriptionsAtom);   
    const distinctUntaggedDescriptions = useAtomValue(distinctUntaggedDescriptionsAtom);
    const newEntries = useAtomValue(newEntriesAtom);
    const newRules = useAtomValue(newRulesAtom);
    const setDescriptionTagsMap = useSetAtom(descriptionTagsMapAtom);
    const [isComplete, setIsComplete] = useAtom(isCompleteAtom);
    const allCsvData = useAtomValue(allCsvDataAtom);
    
    const [client, csvUploadMutation] = useUploadCsvData();

    let descriptionTags: Map<string, string[]> = new Map();
    for (let i = 0; i < distinctUntaggedDescriptions.length; i++) {
        // check if the description has an entry
        for (let j = 0; j < newEntries.length; j++) {
            if (distinctUntaggedDescriptions[i].toLocaleLowerCase() === newEntries[j].captures.toLocaleLowerCase()) {
                descriptionTags.set(distinctUntaggedDescriptions[i], newEntries[j].tags);
                break;
            }
        }
        if (descriptionTags.has(distinctUntaggedDescriptions[i])) continue;
        // check if a rule captures this description
        for (let j = 0; j < newRules.length; j++) {
            if (distinctUntaggedDescriptions[i].toLocaleLowerCase().includes(newRules[j].rule.toLocaleLowerCase())) {
                descriptionTags.set(distinctUntaggedDescriptions[i], newRules[j].tags);
                break;
            }
        }
    }
    setDescriptionTagsMap(descriptionTags);

    if (untaggedDescriptions.length > 0) setStep(1);
    if (allCsvData.length < 1) setStep(0);
    
    useEffect(() => {
        if (distinctUntaggedDescriptions.length === 0) {
            csvUploadMutation.mutate(null);
            setIsComplete(true);
        }
    }, []);

    if (isComplete) 
        return (
            <>
                <div className={`${classes.uploadWidgetContainer}`}>
                    <div className={`${classes.uploadWidget}`}>
                        <Typography variant="h5">Complete!</Typography>
                    </div>
                </div>
            </>
        )

    return (
        <>
            <Typography variant="h5">Reviewing Newly Tagged Entries</Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Entry</TableCell>
                        <TableCell>Tags</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {distinctUntaggedDescriptions.map((description) => (
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

            <Submit buttonText="Complete & Upload CSV into DB" />
        </>
    )
}

export default ReviewData;