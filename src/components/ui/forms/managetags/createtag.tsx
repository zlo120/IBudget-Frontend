import { Button, TextField, Typography } from "@mui/material"
import { useAtom } from "jotai"
import { selectedTagAtom, tagsAtom } from "../../../../app/routes/app/managetags"
import { ChangeEvent, useState } from "react";
import { useCreateTag } from "../../../../api/api";

export const CreateTag = () => {
    const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
    const [tags, setTags] = useAtom(tagsAtom);
    const [creationMessage, setCreationMessage] = useState<string>("");

    const [client, createTagMutation] = useCreateTag();

    const handleCreation = () => {
        if (selectedTag === null || selectedTag === "") return;
        createTagMutation.mutate(null);
        setCreationMessage(`The tag "${selectedTag}" created successfully`);
        if (!tags.includes(selectedTag)) {
            console.log("updating tags state")
            setTags([selectedTag, ...tags])
            console.log("tags")
            console.log(tags)
        };
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedTag(event.target.value);
    }
    return (
        <>
            <Typography variant="h5">Create New Tag</Typography>
            <form onSubmit={(event) => event.preventDefault()}>
                <TextField style={{width: "100%"}} label="Insert tag name" variant="standard" onChange={handleChange}/>
                <div style={{width: "100%"}}>
                    <Button 
                        style={{float: "right", marginTop: "10px"}} 
                        onClick={handleCreation} 
                        type="submit"
                        variant="contained">
                            Create tag
                        </Button>
                </div>
                <Typography variant="caption">Note: Tags are case-insensitive</Typography>
                <Typography variant="subtitle2" sx={{marginTop: "5px"}} style={{color: "#357a38"}}>{creationMessage}</Typography>
            </form>
        </>
    )
}