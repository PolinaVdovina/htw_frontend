import React from 'react'
import { List, ListItem, Typography, useTheme } from '@material-ui/core';
import { BodyElementCompProps } from './post-body-element';

interface IParagraphInPostProps extends BodyElementCompProps  {
    data: {
        title?: string | null,
        description: string | null,
        fontWeight?: number | "inherit" | "initial" | "-moz-initial" | "revert" | "unset" | "bold" | "normal" | "bolder" | "lighter"
    }
}


export const ParagraphInPost = (props: IParagraphInPostProps) => {
    const theme = useTheme();
    return (
        <div>
            {props.data.title && 
            <Typography variant="h5" style={{textAlign:"center", wordBreak: "break-word",}}>
                {props.data.title}
            </Typography>
            }

            <Typography style={{fontWeight:props.data.fontWeight, textIndent: theme.spacing(2), wordBreak: "break-word",}}>
                {props.data.description}
            </Typography>
        </div>
    )
} 