import { Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { stepAtom, allCsvDataAtom, untaggedDescriptionsAtom, distinctUntaggedDescriptionsAtom } from "../../../../app/routes/app/uploadcsv";
import { CloudUpload } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import styles from "./uploadcsv.styles";
import Papa from 'papaparse';
import { useFindUntagged } from "../../../../api/api";
import { CsvData } from "../../../../models/CsvData";

const useStyles = styles;
export const singleEntryTagsAtom = atom<string[]>([]);
export const ruleInputAtom = atom<string>("");
export const ruleTagsAtom = atom<string[]>([]);

const ImportCSV = () => { 
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const { classes } = useStyles();

    const setAllCsvData = useSetAtom(allCsvDataAtom);
    const setUntaggedDescriptions = useSetAtom(untaggedDescriptionsAtom);
    const setDistinctUntaggedDescriptions = useSetAtom(distinctUntaggedDescriptionsAtom);
    const setStep = useSetAtom(stepAtom);
    
    const [file, setFile] = useState<File | null>(null);
    
    const [client, csvMutation] = useFindUntagged();

    const handleFileUpload = (event: any) => {
        setFile(event.target.files![0]);
    };
    const handleSubmit = async () => {
        parseCsvData();
    }
    const parseCsvData = () => {
        Papa.parse(file!, {
            header: true,
            complete: (result) => {
                console.log("completed parsing...");
                setAllCsvData(result.data as CsvData[]);
                console.log(result.data)
                csvMutation.mutate(result.data);
            }
        });
    }

    if (csvMutation.isError) return <Typography variant="body2">An error occurred: {csvMutation.error.message}</Typography>
    if (csvMutation.isSuccess) {
        const responseData: any = client.getQueryData(['untaggedDescriptions', 1]);
        setUntaggedDescriptions(responseData);
        setDistinctUntaggedDescriptions(responseData);
        setStep(1);
    }

    return (
        <div className={`${classes.uploadWidgetContainer}`}>
            <div className={`${classes.uploadWidget}`}>
                {
                    csvMutation.isPending ? (
                        <CircularProgress />
                    ) 
                    : csvMutation.isSuccess ? (
                        <Typography variant="body2">CSV data processed successfully...</Typography>
                    )
                    : (
                        <>
                            <Button
                                component="label"
                                color="success"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUpload />}
                                >
                                Upload file
                                <VisuallyHiddenInput type="file" accept=".csv" onChange={handleFileUpload}/>
                            </Button>
                            {
                                file !== null ? (
                                    <Typography sx={{marginTop: "5px"}} variant="body2">{file.name} uploaded successfully...</Typography>
                                ) : null
                            }
                            <Button variant="contained" color="primary" style={{marginTop:"20px"}} onClick={handleSubmit} disabled={file === null}>Process Csv</Button>                     
                        </>
                    )}    
            </div>
        </div>
    )
}

export default ImportCSV;