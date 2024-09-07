import { Switch, Typography } from "@mui/material";
import styles from "./uploadcsv.styles";
import HelpIcon from '@mui/icons-material/Help';
import { useState } from "react";
import CreateRule from "./taggingdata/createrule";
import TagEntry from "./taggingdata/tagentry";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { stepAtom, untaggedDescriptionsAtom } from "../../../../app/routes/app/uploadcsv";
import { atom, useAtom, useSetAtom } from "jotai";
import { useTagQuery } from "../../../../api/api";
import { Tag } from "../../../../models/Tag";

const useStyles = styles;
export const isCreateRuleAtom = atom<boolean>(false);
export const tagsAtom = atom<Tag[]>([]);

const TagData = () => {    
    const { classes } = useStyles();

    const [untaggedDescriptions, setUntaggedDescriptions] = useAtom(untaggedDescriptionsAtom);
    const [tags, setTags] = useAtom(tagsAtom);
    const [tagsStrings, setTagsStrings] = useState<string[]>([]);
    const setStep = useSetAtom(stepAtom);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [capturedIndices, setCapturedIndices] = useState<number[]>([]);
    const [isCreateRule, setIsCreateRule] = useAtom(isCreateRuleAtom);

    const [client, tagQuery] = useTagQuery();
    
    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        if (!isCreateRule) return setSelectedIndex(index);
        let newArray: number[] = capturedIndices;
        newArray.push(index);
        setCapturedIndices(newArray);
    }
    const isIndexCaptured = (index: number) => {
        for(let i = 0; i < capturedIndices.length; i++) {
            if (index === capturedIndices[i]) return true;
        }
        return false;
    }
    
    if (tagQuery.isError) return <Typography variant="body2">An error occurred: {tagQuery.error.message}</Typography>
    if (tagQuery.isSuccess) setTags(client.getQueryData(['allTags', 1]) as Tag[]);

    if (untaggedDescriptions.length === 0) setStep(2);

    return (
        <>
            <div className={`${classes.tagDataContainer}`}>            
                <div className={`${classes.tagDataObjectContainer}`}>
                    <Typography variant="h5">Untagged Entries</Typography>   
                    <List sx={{maxHeight: "60vh", overflow: "scroll"}}>
                        {untaggedDescriptions.map((obj, index) => {
                            if (index === untaggedDescriptions.length - 1) {
                                return (<ListItem disablePadding>
                                    <ListItemButton 
                                        selected={ (selectedIndex === index && !isCreateRule) 
                                            || (isCreateRule && isIndexCaptured(index))}
                                        onClick={(event) => handleListItemClick(event, index)}
                                        disabled={isCreateRule === true}>
                                        <ListItemText primary={obj}/>
                                    </ListItemButton>
                                </ListItem>)
                            }
                            else {
                                return (<>
                                    <ListItem disablePadding>
                                        <ListItemButton 
                                            selected={ (selectedIndex === index && !isCreateRule) 
                                                || (isCreateRule && isIndexCaptured(index))}
                                            onClick={(event) => handleListItemClick(event, index)}
                                            disabled={isCreateRule === true}>
                                            <ListItemText primary={obj}/>
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </>)
                            }
                        })}
                    </List>
                </div>
                <div className={`${classes.tagDataObjectContainer}`}>
                    <div className={`${classes.createRuleContainer}`}>
                        <Typography>Create Rule</Typography>
                        <HelpIcon className={`${classes.icon}`}/>                        
                        <Switch 
                            checked={isCreateRule} 
                            onChange={() => setIsCreateRule(!isCreateRule)} 
                            inputProps={{ 'aria-label': 'create rule switch' }}
                        />
                    </div>
                <form onSubmit={(event) => event.preventDefault()}>
                    {
                        isCreateRule ? (
                            <CreateRule />
                        ) : <TagEntry entryName={untaggedDescriptions[selectedIndex]}/>
                    }
                </form>
                </div>
            </div>
        </>
    )
}

export default TagData;