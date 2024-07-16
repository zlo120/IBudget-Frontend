import { Autocomplete, TextField, Typography } from "@mui/material";
import styles from "../uploadcsv.styles";
import Submit from "../submit";
import { useAtom } from "jotai";
import { untaggedCsvDataAtom } from "../../../../../app/routes/app/uploadcsv";
import { tagsAtom } from "../tagdata";

const useStyles = styles;
const CreateRule = () => {
    const { classes } = useStyles();
    const [untaggedCsvData, setUntaggedCsvData] = useAtom(untaggedCsvDataAtom);
    const [tags, setTags] = useAtom(tagsAtom);
    return (
        <>
            <Typography variant="h5">Create Rule</Typography>
            <TextField id="standard-basic" label="Rule" placeholder="i.e. Coles" variant="standard" className={`${classes.formItem}`}/>
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
            <Submit text={`You have ${untaggedCsvData.length} entries left.`} buttonText="Create Rule"/>
        </>
    );
}

export default CreateRule;