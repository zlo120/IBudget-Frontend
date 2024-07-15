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

const useStyles = styles;
const TagData = () => { 
    const { classes } = useStyles();
    const dummyData = ["K-Fresh", "Kmart", "Big W", "Coles Express", "Stock Exchange Hotel"];
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [capturedIndices, setCapturedIndices] = useState<number[]>([]);
    const [isCreateRule, setIsCreateRule] = useState(false);

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
                    <List>
                        {dummyData.map((text, index) => {
                            if (index === dummyData.length - 1) {
                                return (<ListItem disablePadding>
                                    <ListItemButton 
                                        selected={ (selectedIndex === index && !isCreateRule) 
                                            || (isCreateRule && isIndexCaptured(index))}
                                        onClick={(event) => handleListItemClick(event, index)}
                                        disabled={isCreateRule === true}>
                                        <ListItemText primary={text}/>
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
                                            <ListItemText primary={text}/>
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
                    ) : <TagEntry entryName={dummyData[selectedIndex]}/>
                }
                </div>
            </div>
        </>
    )
}

export default TagData;