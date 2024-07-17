import { Button, Typography } from "@mui/material";
import styles from "./uploadcsv.styles";

const useStyles = styles;
type SubmitProps = {
    text?: string,
    buttonText: string
}

const Submit = (props: SubmitProps) => {
    const { classes } = useStyles();
    const { text, buttonText } = props;
    
    return (
        <div className={`${classes.submitContainer}`}>
            <Typography variant="subtitle1" style={{marginTop: "10px"}}>{text}</Typography>
            <Button variant="contained" className={`${classes.submit}`} type="submit" onClick={() => alert("Submitted")}>{buttonText}</Button>
        </div>
    )
}

export default Submit;