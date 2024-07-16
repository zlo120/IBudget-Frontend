import { Autocomplete, TextField, Typography } from "@mui/material";
import styles from "../uploadcsv.styles";
import { useState } from "react";
import Submit from "../submit";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { untaggedCsvDataAtom } from "../../../../../app/routes/app/uploadcsv";
import { tagsAtom } from "../tagdata";

const useStyles = styles;
interface TagEntryProps {
    entryName : string
}
const TagEntry = (props: TagEntryProps) => {
    const { classes } = useStyles();
    const {entryName} = props;
    const [untaggedCsvData, setUntaggedCsvData] = useAtom(untaggedCsvDataAtom);
    const [tags, setTags] = useAtom(tagsAtom);
    return (
        <>
            <Typography variant="h5">Tagging Entry</Typography>
            <TextField id="standard-basic" label="Captures" value={entryName} variant="standard" className={`${classes.formItem}`} disabled/>
            <Autocomplete
                multiple
                id="tags-standard"
                options={tags}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Enter Tags"
                />
                )}
            />
            <Submit text={`You have ${untaggedCsvData.length} entries left.`} buttonText="Submit" />
        </>
    );
}

export default TagEntry;