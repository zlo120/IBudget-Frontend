import { Autocomplete, TextField, Typography } from "@mui/material";
import styles from "../uploadcsv.styles";
import { useState } from "react";
import Submit from "../submit";

const useStyles = styles;
interface TagEntryProps {
    entryName : string
}
const TagEntry = (props: TagEntryProps) => {
    const { classes } = useStyles();
    const {entryName} = props;

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
            <Typography variant="h5">Tagging Entry</Typography>
            <TextField id="standard-basic" label="Captures" value={entryName} variant="standard" className={`${classes.formItem}`} disabled/>
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
            <Submit text={`You have ${tagDummyData.length} entries left.`} buttonText="Submit" />
        </>
    );
}

export default TagEntry;