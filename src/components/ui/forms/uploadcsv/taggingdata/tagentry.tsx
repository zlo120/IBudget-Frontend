import { Autocomplete, TextField, Typography } from "@mui/material";
import styles from "../uploadcsv.styles";
import Submit from "../submit";
import { atom, useAtom, useSetAtom } from "jotai";
import { untaggedDescriptionsAtom } from "../../../../../app/routes/app/uploadcsv";
import { tagsAtom } from "../tagdata";
import { singleEntryTagsAtom } from "../importcsv";

const useStyles = styles;
export const entryNameAtom = atom<string>("");
type TagEntryProps = {
    entryName : string
}
const TagEntry = (props: TagEntryProps) => {
    const { classes } = useStyles();
    const {entryName} = props;

    const [untaggedDescriptions, setUntaggedDescriptions] = useAtom(untaggedDescriptionsAtom);
    const [tags, setTags] = useAtom(tagsAtom);
    const [singleEntryTags, setSingleEntryTags] = useAtom(singleEntryTagsAtom);
    const setEntryName = useSetAtom(entryNameAtom);
    setEntryName(entryName);
    return (
        <>
            <Typography variant="h5">Tagging Entry</Typography>
            <TextField id="standard-basic" label="Captures" value={entryName} variant="standard" className={`${classes.formItem}`} disabled/>
            <Autocomplete
                multiple
                id="tags-standard"
                options={
                    tags.map(tag=> tag.tagName)}
                value={singleEntryTags}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                onChange={(event, value) => setSingleEntryTags(value)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Enter Tags"
                />
                )}
            />
            <Submit text={`You have ${untaggedDescriptions.length} entries left.`} buttonText="Submit" />
        </>
    );
}

export default TagEntry;