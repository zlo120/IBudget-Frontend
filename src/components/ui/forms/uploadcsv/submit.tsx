import { Button, Typography } from "@mui/material";
import styles from "./uploadcsv.styles";
import { useAtom, useAtomValue } from "jotai";
import { ruleInputAtom, ruleTagsAtom, singleEntryTagsAtom } from "./importcsv";
import { isCreateRuleAtom } from "./tagdata";
import { NewEntry } from "../../../../models/NewEntry";
import { NewRule } from "../../../../models/NewRule";
import { entryNameAtom } from "./taggingdata/tagentry";
import { newEntriesAtom, newRulesAtom, untaggedDescriptionsAtom } from "../../../../app/routes/app/uploadcsv";

const useStyles = styles;
type SubmitProps = {
    text?: string,
    buttonText: string
}

const Submit = (props: SubmitProps) => {
    const { classes } = useStyles();
    const { text, buttonText } = props;

    const [ruleInput, setRuleInput] = useAtom(ruleInputAtom);
    const [ruleTags, setRuleTags] = useAtom(ruleTagsAtom);
    const singleEntryInput = useAtomValue(entryNameAtom);
    const [singleEntryTags, setSingleEntryTags] = useAtom(singleEntryTagsAtom);
    const isCreateRule = useAtomValue(isCreateRuleAtom);
    const [newEntries, setNewEntries] = useAtom(newEntriesAtom);
    const [newRules, setNewRules] = useAtom(newRulesAtom);
    const [untaggedDescriptions, setUntaggedDescriptions] = useAtom(untaggedDescriptionsAtom);

    const getAppropriateFormData = (): NewEntry|NewRule => {
        if (isCreateRule) {
            const rule: NewRule = {
                rule: ruleInput,
                tags: ruleTags
            }; 
            return rule;
        }
        
        const entry : NewEntry = {
            captures: singleEntryInput,
            tags: singleEntryTags
        };
        return entry; 
    }
    const createEntry = () => {
        const newEntry = getAppropriateFormData() as NewEntry;
        // add it to an array state of new entries
        setNewEntries([...newEntries, newEntry]);
        // delete the entry from the untaggedDescriptions array
        setUntaggedDescriptions(untaggedDescriptions.filter((entry) => entry !== singleEntryInput));
    }
    const createRule = () => {
        const newRule = getAppropriateFormData() as NewRule;
        // add it to an array state of new rules
        setNewRules([...newRules, newRule]);
        // delete all entries that match that the rule captures from the untaggedDescriptions array
        setUntaggedDescriptions(untaggedDescriptions.filter((entry) => {
            if (entry.toLocaleLowerCase().includes(newRule.rule.toLocaleLowerCase())) return false;
            return true;
        }));
    }
    const handleSubmit = () => {
        if (isCreateRule && ruleTags.length === 0) return;
        else if (!isCreateRule && singleEntryTags.length === 0) return;
        if (isCreateRule) createRule();
        else createEntry();
        setRuleInput("");
        setRuleTags([]);
        setSingleEntryTags([]);
    }
    
    return (
        <div className={`${classes.submitContainer}`}>
            <Typography variant="subtitle1" style={{marginTop: "10px"}}>{text}</Typography>
            <Button variant="contained" className={`${classes.submit}`} type="submit" onClick={handleSubmit}>{buttonText}</Button>
        </div>
    )
}

export default Submit;