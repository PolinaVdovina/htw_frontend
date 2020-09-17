import React from 'react'
import { List, ListItem, Typography, useTheme } from '@material-ui/core';
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
            <img src={"/personal/apchi/achievementFile/get?filepath=" + props.data.path}></img>
        </div>
    )
}