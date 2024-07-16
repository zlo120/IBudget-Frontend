import { Button, CircularProgress, Typography } from "@mui/material";
import styles from "./uploadcsv.styles";
import React, { ChangeEventHandler, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useAtom } from "jotai";
import { taggedCsvDataAtom, untaggedCsvDataAtom } from "../../../../app/routes/app/uploadcsv";
import { useQuery } from "@tanstack/react-query";
import Papa from 'papaparse';
import { CloudUpload } from "@mui/icons-material";
import { styled } from '@mui/material/styles';

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

    const [taggedCsvData, setTaggedCsvData] = useAtom(taggedCsvDataAtom);
    const [untaggedCsvData, setUntaggedCsvData] = useAtom(untaggedCsvDataAtom);
    
    const { classes } = useStyles();
    const [file, setFile] = useState<File | null>(null);
    const handleChange = (event: any) => {
        setFile(event.target.files![0]);
    };

    const handleProcessCsv = () => {
        console.log("processing csv, please wait...")
        Papa.parse(file!, {
            header: true,
            complete: (result) => {
                console.log(result.data);
            }
        });
        // postCsvData.refetch();
    }

    const postCsvData = useQuery({
        queryKey: ['sendCsvData'],
        refetchOnWindowFocus: false,
        enabled: false,
        queryFn: () => fetch('https://localhost:7163/api/CSVParser/OrganiseCSV')
            .then(res => res.json()),
    });

    return (
        <div className={`${classes.uploadWidgetContainer}`}>
            <div className={`${classes.uploadWidget}`}>
                {
                    postCsvData.isLoading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            {/* <FileUploader 
                                handleChange={handleChange} 
                                name="file" 
                                types={["CSV"]} 
                                label="Upload your file by either clicking here or dragging your file into here. Supported file types: "
                            /> */}
                            <Button
                                component="label"
                                color="success"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUpload />}
                                >
                                Upload file
                                <VisuallyHiddenInput type="file" accept=".csv" onChange={handleChange}/>
                            </Button>
                            {
                                file !== null ? (
                                    <Typography sx={{marginTop: "5px"}} variant="body2">{file.name} uploaded successfully...</Typography>
                                ) : null
                            }
                            <Button variant="contained" color="primary" style={{marginTop:"20px"}} onClick={handleProcessCsv} disabled={file === null}>Process Csv</Button>                     
                        </>
                    )}    
            </div>
        </div>
    )
}

export default ImportCSV;