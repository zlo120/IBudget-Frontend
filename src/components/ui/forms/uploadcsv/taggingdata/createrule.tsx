import { Autocomplete, TextField, Typography } from "@mui/material";
import styles from "../uploadcsv.styles";
import Submit from "../submit";
import { useAtom } from "jotai";
import { untaggedDescriptionsAtom } from "../../../../../app/routes/app/uploadcsv";
import { tagsAtom } from "../tagdata";
import { ruleInputAtom, ruleTagsAtom } from "../importcsv";
import { Tag } from "../../../../../models/Tag";

const useStyles = styles;
const CreateRule = () => {
    const { classes } = useStyles();
    
    const [untaggedDescriptions, setUntaggedDescriptions] = useAtom(untaggedDescriptionsAtom);
    const [tags, setTags] = useAtom(tagsAtom);
    const [ruleInput, setRuleInput] = useAtom(ruleInputAtom);
    const [ruleTags, setRuleTags] = useAtom(ruleTagsAtom);

    return (
        <>
            <Typography variant="h5">Create Rule</Typography>
            <TextField 
                id="standard-basic" 
                label="Rule" 
                placeholder="i.e. Coles" 
                variant="standard" 
                className={`${classes.formItem}`} 
                value={ruleInput} 
                onChange={(event) => setRuleInput(event.target.value)}
            />
            <Autocomplete
                multiple
                id="tags-standard"
                value={ruleTags}
                options={
                    tags.map(tag=> tag.tagName)}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                onChange={(event, value) => setRuleTags(value)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Enter Tags"
                />
                )}
            />
            <Submit text={`You have ${untaggedDescriptions.length} entries left.`} buttonText="Create Rule"/>
        </>
    );
}

export default CreateRule;