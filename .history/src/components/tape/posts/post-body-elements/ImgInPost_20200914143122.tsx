import React from 'react'
import { List, ListItem, Typography, useTheme, GridList, GridListTile, Dialog, DialogContent, Container } from '@material-ui/core';
import { BodyElementCompProps } from './post-body-element';
import classes from '*.module.css';

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
            <GridList cellHeight={160} /*className={classes.gridList}*/ cols={2}>
                {props.data.paths.map((path) => (
                    <GridListTile key={path} cols={1}>
                        <img  onClick={() => {setOpenDialog(true); setBigImagePath(path)}}
                            src={"/personal/apchi/achievementFile/get?filepath=" + path}>
                        </img>
                    </GridListTile>
                ))}
            </GridList>
            <Dialog open={openDialog} /*fullWidth maxWidth={"lg"}*/ onClose={() => {setOpenDialog(false); setBigImagePath("")}}>
                <DialogContent>
                    <img  width='650px'
                        src={"/personal/apchi/achievementFile/get?filepath=" + bigImagePath}>
                    </img>
                    
                </DialogContent>
            </Dialog>
        </div>
    )
}