import React from 'react'
import { IconButton, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

interface IAddEntityBlockProps {
    handleClickOpen: () => void,
}

export default function AddEntityBlock(props: IAddEntityBlockProps) {
    return (
        <Grid container justify='center'>
            <IconButton style={{width: '50px'}} onClick={() => props.handleClickOpen()}>
            <AddIcon/>
            </IconButton> 
        </Grid>  
    )
}
