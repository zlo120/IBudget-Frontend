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
import { untaggedDescriptionsAtom } from "../../../../app/routes/app/uploadcsv";
import { atom, useAtom } from "jotai";
import { useTagQuery } from "../../../../api/api";

const useStyles = styles;
export const tagsAtom = atom<string[]>([]);
export const distinctUntaggedCsvDataAtom = atom<string[]>([]);

const TagData = () => {    
    const { classes } = useStyles();

    const [untaggedDescriptions, setUntaggedDescriptions] = useAtom(untaggedDescriptionsAtom);
    const [tags, setTags] = useAtom(tagsAtom);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [capturedIndices, setCapturedIndices] = useState<number[]>([]);
    const [isCreateRule, setIsCreateRule] = useState(false);

    const tagQuery = useTagQuery();

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
                {
                    isCreateRule ? (
                        <CreateRule />
                    ) : <TagEntry entryName={untaggedDescriptions[selectedIndex]}/>
                }
                </div>
            </div>
        </>
    )
}

export default TagData;