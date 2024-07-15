import { Autocomplete, TextField, Typography } from "@mui/material";
import styles from "../uploadcsv.styles";
import Submit from "../submit";

const useStyles = styles;
const CreateRule = () => {
    const { classes } = useStyles();
    const tagDummyData = [
        { title: "Groceries" },
        { title: "Other" },
        { title: "Entertainment" },
        { title: "Health" },
        { title: "Food" },
        { title: "Petrol" },
        { title: "Essentials" }
    ]

    return (
        <>
            <Typography variant="h5">Create Rule</Typography>
            <TextField id="standard-basic" label="Rule" placeholder="i.e. Coles" variant="standard" className={`${classes.formItem}`}/>
            <Autocomplete
                multiple
                id="tags-standard"
                options={tagDummyData}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Enter Tags"
                />
                )}
            />
            <Submit text={`You have ${tagDummyData.length} entries left.`} buttonText="Create Rule"/>
        </>
    );
}

export default CreateRule;