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
            <p>vsopwjpwoejvpoi</p>
            <img src={"/achievementFile/" + props.data.path}></img>
        </div>
    )
}