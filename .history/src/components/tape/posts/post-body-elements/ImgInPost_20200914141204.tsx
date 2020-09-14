import React from 'react'
import { List, ListItem, Typography, useTheme, GridList, GridListTile } from '@material-ui/core';
import { BodyElementCompProps } from './post-body-element';
import classes from '*.module.css';

interface IImgInPostProps extends BodyElementCompProps  {
    data: {
        paths: Array<string>
    }
}


export const ImgInPost = (props: IImgInPostProps) => {
    const theme = useTheme();
    return (
        <div>            
            <GridList cellHeight={160} /*className={classes.gridList}*/ cols={2}>
                {props.data.paths.map((path) => (
                    <GridListTile key={path} cols={1}>
                        <img  onClick={() => alert('sv')}
                            src={"/personal/apchi/achievementFile/get?filepath=" + path}>
                        </img>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}