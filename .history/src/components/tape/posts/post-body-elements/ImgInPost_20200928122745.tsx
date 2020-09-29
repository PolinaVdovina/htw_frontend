import React from 'react'
import { List, ListItem, Typography, useTheme, GridList, GridListTile, Dialog, DialogContent, Container } from '@material-ui/core';
import { BodyElementCompProps } from './post-body-element';
import classes from '*.module.css';
import { getApchiUrl } from '../../../../utils/fetchFunctions';

interface IImgInPostProps extends BodyElementCompProps  {
    data: {
        paths: Array<string>
    }
}


export const ImgInPost = (props: IImgInPostProps) => {
    const theme = useTheme();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [bigImagePath, setBigImagePath] = React.useState("");

    return (
        <div>            
            <GridList cellHeight={160} cols={2} style={{maxWidth: '570px'}}>
                {props.data.paths.map((path) => (
                    <GridListTile key={path} cols={1}>
                        <img  onClick={() => {setOpenDialog(true); setBigImagePath(path)}}
                            src={getApchiUrl(path)}>
                        </img>
                    </GridListTile>
                ))}
            </GridList>
            <Dialog open={openDialog} onClose={() => {setOpenDialog(false); setBigImagePath("")}}>
                <DialogContent>
                    <img  width='650px'
                        src={getApchiUrl(bigImagePath)}>
                    </img>                    
                </DialogContent>
            </Dialog>
        </div>
    )
}