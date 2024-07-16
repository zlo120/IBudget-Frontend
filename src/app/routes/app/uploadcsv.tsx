import { Stepper, Step, StepLabel, Typography } from "@mui/material"
import { useState } from "react";
import ImportCSV from "../../../components/ui/forms/uploadcsv/importcsv";
import TagData from "../../../components/ui/forms/uploadcsv/tagdata";
import ReviewData from "../../../components/ui/forms/uploadcsv/review";
import { atom, useAtom } from "jotai";

export type CsvData = {
    date: string, 
    amount: number,
    description: string,
    tags?: string[]
}

export const allCsvDataAtom = atom<CsvData[]>([]);
export const untaggedCsvDataAtom = atom<CsvData[]>([]);
export const stepAtom = atom<number>(0);

export const UploadCSV = () => {
    const steps = [
        'Import Csv File',
        'Tag Data',
        'Review and Complete',
    ];

    const [step, setStep] = useAtom(stepAtom);

    const navigateToStep = (label: string) => {
        switch(label) {
            case steps[0]:
                setStep(0);
                break;
            case steps[1]:
                setStep(1);
                break;            
            case steps[2]:
                setStep(2);
                break;
            default:
                setStep(0);
                break;
        }
    }

    return (
        <>
            <Typography variant="h4">Upload CSV</Typography>
            <Stepper activeStep={step} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label} onClick={() => {navigateToStep(label)}}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {
                step === 0 ? (
                    <ImportCSV />
                )
                : step === 1 ? (
                    <TagData />
                )
                : step === 2 ? (
                    <ReviewData/>
                )
                : null
            }
        </>
    )
}