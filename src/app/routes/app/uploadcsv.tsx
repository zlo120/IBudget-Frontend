import { Stepper, Step, StepLabel, Typography } from "@mui/material"
import { useState } from "react";
import ImportCSV from "../../../components/ui/forms/uploadcsv/importcsv";
import TagData from "../../../components/ui/forms/uploadcsv/tagdata";
import ReviewData from "../../../components/ui/forms/uploadcsv/review";
import { atom } from "jotai";

type CsvData = {
    date: string, 
    amount: number,
    description: string,
    tags: string[]
}

export const taggedCsvDataAtom = atom<CsvData[]>([]);
export const untaggedCsvDataAtom = atom<CsvData[]>([]);

export const UploadCSV = () => {
    const [page, setPage] = useState(0);

    const steps = [
        'Import Csv File',
        'Tag Data',
        'Review and Complete',
    ];

    const navigateToStep = (label: string) => {
        switch(label) {
            case steps[0]:
                setPage(0);
                break;
            case steps[1]:
                setPage(1);
                break;            
            case steps[2]:
                setPage(2);
                break;
            default:
                setPage(0);
                break;
        }
    }

    return (
        <>
            <Typography variant="h4">Upload CSV</Typography>
            <Stepper activeStep={page} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label} onClick={() => {navigateToStep(label)}}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {
                page === 0 ? (
                    <ImportCSV />
                )
                : page === 1 ? (
                    <TagData />
                )
                : page === 2 ? (
                    <ReviewData/>
                )
                : null
            }
        </>
    )
}