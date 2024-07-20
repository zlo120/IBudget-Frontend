import { Grid, Typography } from "@mui/material";
import { useTagQuery } from "../../../api/api"
import { DeleteTags } from "../../../components/ui/forms/managetags/deletetags";
import { CreateTag } from "../../../components/ui/forms/managetags/createtag";
import { atom } from "jotai";
import { UseQueryResult } from "@tanstack/react-query";

export const selectedTagAtom = atom<string | null>(null);
export const tagsAtom = atom<string[]>([]);

export const ManageTags = () => {

    return (
        <>
            <Typography variant="h4">Manage Tags</Typography>
            <Grid container spacing={2} style={{marginTop: "5px"}}>
                <Grid item xs={6}>
                    <DeleteTags />
                </Grid>
                <Grid item xs={6}>
                    <CreateTag />
                </Grid>
            </Grid>
        </>
    )
}