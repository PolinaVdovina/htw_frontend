import React from 'react'
import { List, ListItem, Typography, useTheme, Avatar } from '@material-ui/core';
import { BodyElementCompProps } from './post-body-element';

interface IImgInPostProps extends BodyElementCompProps  {
    data: {
        path: string
    }
}


export const ImgInPost = (props: IImgInPostProps) => {
    const theme = useTheme();
    return (
        <div>
            <Avatar src={"/personal/achievementFile/" + props.data.path}></Avatar>
        </div>
    )
}