import { Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Modal, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteTag, useTagQuery } from "../../../../api/api";
import { selectedTagAtom } from "../../../../app/routes/app/managetags";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { tagsAtom } from "../uploadcsv/tagdata";

export const DeleteTags = () => {
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
        setSelectedTag(tags![id]);
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
        setTags(tagQuery.data as string[]);
        console.log("tags")
        console.log(tags)
    }, [tagQuery.isSuccess]);
    
    if (tagQuery.isError) return <Typography variant="body2">An error occurred: {tagQuery.error.message}</Typography>  

    if (tagQuery.isLoading) return <Typography variant="body2">Loading...</Typography>  
    
    return (
        <>
            <Typography variant="h5">Existing Tags</Typography>
            {
                tagQuery.isLoading ? <Typography variant="body2">Loading...</Typography>
                :
                tagQuery.isSuccess ? <List sx={{maxHeight: "70vh", overflow: "scroll"}}>
                    {tags?.map((obj, index) => {
                        return (
                            <>
                                <ListItem 
                                    key={index}
                                    disablePadding
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleStagingDelete(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        }
                                >
                                    <ListItemButton>
                                        <ListItemText primary={obj} />
                                    </ListItemButton>
                                </ListItem>
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
    )
}