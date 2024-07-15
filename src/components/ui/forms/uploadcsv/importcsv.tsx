import { Typography } from "@mui/material";
import styles from "./uploadcsv.styles";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const useStyles = styles;
const ImportCSV = () => { 
    const { classes } = useStyles();
    const [file, setFile] = useState(null);
    const handleChange = (file: any) => {
        setFile(file);
    };

    return (
        <div className={`${classes.uploadWidgetContainer}`}>
            <div className={`${classes.uploadWidget}`}>
                <FileUploader 
                    handleChange={handleChange} 
                    name="file" 
                    types={["CSV"]} 
                    label="Upload your file by either clicking here or dragging your file into here. Supported file types: "
                />
            </div>
        </div>
    )
}

export default ImportCSV;