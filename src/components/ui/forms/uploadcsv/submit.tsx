import { Button, Typography } from "@mui/material";
import styles from "./uploadcsv.styles";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { ruleInputAtom, ruleTagsAtom, singleEntryTagsAtom } from "./importcsv";
import { isCreateRuleAtom } from "./tagdata";
import { NewEntry } from "../../../../models/NewEntry";
import { NewRule } from "../../../../models/NewRule";
import { entryNameAtom } from "./taggingdata/tagentry";
import { allCsvDataAtom, distinctUntaggedDescriptionsAtom, newEntriesAtom, newRulesAtom, stepAtom, untaggedDescriptionsAtom } from "../../../../app/routes/app/uploadcsv";
import { descriptionTagsMapAtom, isCompleteAtom } from "./review";
import { usePostNewEntry, usePostNewRule, useUploadCsvData, useUploadNewEntryRule } from "../../../../api/api";

const useStyles = styles;
type SubmitProps = {
    text?: string,
    buttonText: string
}

export const newRuleAtom = atom<NewRule>({} as NewRule);
export const newRuleCounterAtom = atom<number>(-1);
export const newEntryAtom = atom<NewEntry>({} as NewEntry);
export const newEntryCounterAtom = atom<number>(-1);

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
    const distinctUntaggedDescriptions = useAtomValue(distinctUntaggedDescriptionsAtom);
    const step = useAtomValue(stepAtom);
    const descriptionTagsMap = useAtomValue(descriptionTagsMapAtom);
    const allCsvData = useAtomValue(allCsvDataAtom);
    const setIsComplete = useSetAtom(isCompleteAtom);
    const setNewRule = useSetAtom(newRuleAtom);
    const setNewEntry = useSetAtom(newEntryAtom);
    const [newRuleCounter, setNewRuleCounter] = useAtom(newRuleCounterAtom);
    const [newEntryCounter, setNewEntryCounter] = useAtom(newEntryCounterAtom);

    const [csvUploadClient, csvUploadMutation] = useUploadCsvData();
    const [uploadNewEntryRuleClient, uploadNewEntryRuleMutation] = useUploadNewEntryRule();  
    const [postNewRuleClient, uploadNewRuleMutation] = usePostNewRule();
    const [postNewEntryClient, uploadNewEntryMutation] = usePostNewEntry(); 

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
        
        // auto save: call api
        setNewEntry(newEntry);
        setNewEntryCounter(newEntryCounter + 1);
        uploadNewEntryMutation.mutate(null);
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

        // auto save: call api
        setNewRule(newRule);
        setNewRuleCounter(newRuleCounter + 1);
        uploadNewRuleMutation.mutate(null);
    }
    const handleSubmit = () => {
        if (step === 1) {
            if (isCreateRule && ruleTags.length === 0) return;
            else if (!isCreateRule && singleEntryTags.length === 0) return;
            if (isCreateRule) createRule();
            else createEntry();
            setRuleInput("");
            setRuleTags([]);
            setSingleEntryTags([]);
        }
        else if (step === 2) {
            uploadNewEntryRuleMutation.mutate(null);
            csvUploadMutation.mutate(null);
            setIsComplete(true);            
        }
    }
    
    return (
        <div className={`${classes.submitContainer}`}>
            <Typography variant="subtitle1" style={{marginTop: "10px"}}>{text}</Typography>
            <Button variant="contained" className={`${classes.submit}`} type="submit" onClick={handleSubmit}>{buttonText}</Button>
        </div>
    )
}

export default Submit;