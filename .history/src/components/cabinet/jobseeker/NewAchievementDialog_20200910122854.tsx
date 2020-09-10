import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";

interface INewAchievementDialog {
    token: string
    onClose: () => void
    onSubmitSuccess: () => void
    open: boolean
}

export const NewAchievementDialog = (props) => {
    return(
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Добавление достижения</DialogTitle>
            <DialogContent></DialogContent>
        </Dialog>
    )
}