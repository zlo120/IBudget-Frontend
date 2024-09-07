import { atom } from "jotai";
import { TextField, Grid, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Modal, Typography, FormGroup, FormControlLabel, Checkbox, ListItemIcon } from "@mui/material";
import { useDeleteTag, useTagQuery } from "../../../api/api";
import { useAtom } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateTag } from "../../../api/api";
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { Tag } from "../../../models/Tag";

export const selectedTagAtom = atom<string | null>(null);
export const tagsAtom = atom<Tag[]>([]);
export const trackedTagAtom = atom<boolean>(false);

export const ManageTags = () => {
    // DELETING TAG CONTENT
    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };    
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
    const [tagIndex, setTagIndex] = useState<number>(0);
    const [tags, setTags] = useAtom(tagsAtom);
    const handleStagingDelete = (id: number) => {
        toggleModal();
        setSelectedTag(tags![id].tagName);
        setTagIndex(id);
    }
    const handleDelete = () => {
        deleteTagMutation.mutate(null);
        tags!.splice(tagIndex, 1);
        toggleModal();
    }
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    }
    const [mutationClient, deleteTagMutation] = useDeleteTag();    
    const [client, tagQuery] = useTagQuery();
    useEffect(() => {
        setTags(tagQuery.data as Tag[]);
        console.log("tags");
        console.log(tags);
    }, [tagQuery.isSuccess]);
    
    // CREATING TAG CONTENT
    const [creationMessage, setCreationMessage] = useState<string>("");
    const [tagInput, setTagInput] = useState<string>("");
    const [isTrackedTag, setIsTrackedTag] = useAtom<boolean>(trackedTagAtom);
    const [createTagClient, createTagMutation] = useCreateTag();

    const handleCreation = () => {
        if (tagInput === null || tagInput === "") return;
        setSelectedTag(tagInput);
        createTagMutation.mutate(null);
        setCreationMessage(`The tag "${tagInput}" created successfully`);   
        const tagExistsAlready = tags.some(tag => tag.tagName === tagInput);     
        if (!tagExistsAlready) {
            console.log("updating tags state");
            const newTag: Tag = {
                tagName: tagInput,
                isTracked: isTrackedTag
            };
            setTags([newTag, ...tags]);
        };
        setTagInput("");
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTagInput((event.target.value as string).toLowerCase());
    }
    const handleCheckboxChange = () => {
        setIsTrackedTag(!isTrackedTag);
    }

    return (
        <>
            <Typography variant="h4">Manage Tags</Typography>
            <Grid container spacing={2} style={{marginTop: "5px"}}>
                <Grid item xs={6}>
                    <>
                        <Typography variant="h5">Existing Tags</Typography>
                        {
                            tagQuery.isLoading ? <Typography variant="body2">Loading...</Typography>
                            :
                            tagQuery.isError ? <Typography variant="body2">An error occurred: {tagQuery.error.message}</Typography>
                            :
                            tagQuery.isSuccess ? <List sx={{maxHeight: "70vh", overflow: "scroll"}}>
                                {tags?.map((obj, index) => {
                                    return (
                                        <>
                                            {
                                                obj.tagName === "Ignored" ? 
                                                <ListItem 
                                                    key={index}
                                                    disablePadding
                                                >
                                                    <ListItemIcon />
                                                    <ListItemButton>
                                                        <ListItemText primary={obj.tagName} />
                                                    </ListItemButton>
                                                </ListItem>
                                                :
                                                <ListItem 
                                                    key={index}
                                                    disablePadding
                                                    secondaryAction={                                                    
                                                        <IconButton edge="end" aria-label="delete" onClick={() => handleStagingDelete(index)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        }
                                                >
                                                    <ListItemIcon>
                                                        {
                                                            obj.isTracked ? <LabelImportantIcon color="warning" /> : null
                                                        }
                                                    </ListItemIcon>
                                                    <ListItemButton>
                                                        <ListItemText primary={obj.tagName} />
                                                    </ListItemButton>
                                                </ListItem>
                                            }
                                            { index === tags!.length - 1 ? null : <Divider /> }
                                        </>
                                    )
                                })}
                            </List>
                        : null
                        }

                        <Modal
                            open={isModalOpen}
                            onClose={toggleModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Confirm Delete
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Are you sure you want to delete the tag "{selectedTag}"?
                            </Typography>
                            <div style={{width: "100%"}}><Button style={{float: "right", marginTop: "10px"}} onClick={handleDelete} variant="contained">Delete</Button></div>
                            </Box>
                        </Modal>
                    </>
                </Grid>
                <Grid item xs={6}>
                    <>
                        <Typography variant="h5">Create New Tag</Typography>
                        <form onSubmit={(event) => event.preventDefault()}>
                            <TextField style={{width: "100%"}} label="Insert tag name" variant="standard" value={tagInput} onChange={handleChange}/>
                            <div style={{width: "100%"}}>
                                <Button 
                                    style={{float: "right", marginTop: "10px"}} 
                                    onClick={handleCreation} 
                                    type="submit"
                                    variant="contained">
                                        Create tag
                                    </Button>
                            </div>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value={isTrackedTag} onChange={handleCheckboxChange}/>} label="Tracked tag" />
                                <Typography variant="caption">Note: Tags are case-insensitive</Typography>
                                <Typography variant="subtitle2" sx={{marginTop: "5px"}} style={{color: "#357a38"}}>{creationMessage}</Typography>
                            </FormGroup>
                        </form>
                    </>
                </Grid>
            </Grid>
        </>
    )
}