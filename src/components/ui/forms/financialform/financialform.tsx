import { Typography } from "@mui/material";

type FinancialFormProps = {
    type: string;
}

const FinancialForm = (props: FinancialFormProps) => {
    const { type } = props;
    
    switch (type) {
        case "Income":
            return (
                <>
                </>
            )
        case "Expense":
            return (
                <>
                </>
            )
        default:
            return (
                <>
                    <Typography variant="h4">An error has occurred</Typography>
                    <Typography variant="body1">The financial form type "{type}" does not exist. Please implement a fix for this</Typography> 
                </>
            )
    }
}

export default FinancialForm;