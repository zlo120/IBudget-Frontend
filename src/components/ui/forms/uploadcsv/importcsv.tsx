import { Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useAtom } from "jotai";
import { CsvData, stepAtom, allCsvDataAtom, untaggedCsvDataAtom } from "../../../../app/routes/app/uploadcsv";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CloudUpload } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import styles from "./uploadcsv.styles";
import Papa from 'papaparse';

interface SortResponse {
    taggedRecords: any;
    untaggedRecords: any;
}

const useStyles = styles;
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

    const [allCsvData, setAllCsvData] = useAtom(allCsvDataAtom);
    const [untaggedCsvData, setUntaggedCsvData] = useAtom(untaggedCsvDataAtom);
    const [step, setStep] = useAtom(stepAtom);
    
    const { classes } = useStyles();
    const [file, setFile] = useState<File | null>(null);

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
                csvMutation.mutate(result.data);
            }
        });
    }

    const sendCsvData = async (csvData: any): Promise<Response> => {
        return fetch('https://localhost:7163/api/CSVParser/OrganiseCSV', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(csvData)
        });
    }
    const client = useQueryClient();
    const csvMutation = useMutation({
        mutationFn: sendCsvData,
        onSuccess: (res) => res.json().then(res => client.setQueryData(['csvData', 1], res)),
    });

    if (csvMutation.isError) return <Typography variant="body2">An error occurred: {csvMutation.error.message}</Typography>

    if (csvMutation.isSuccess) {
        const responseData: SortResponse | undefined = client.getQueryData(['csvData', 1]);
        setUntaggedCsvData(responseData!.untaggedRecords as CsvData[]);
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