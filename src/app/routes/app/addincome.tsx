import { Typography } from "@mui/material"
import FinancialForm from "../../../components/ui/forms/financialform/financialform"

export const AddIncome = () => {
    return(
        <>
            <Typography variant="h4">Add Expense</Typography>
            <FinancialForm type="Income" />
        </>
    )
}