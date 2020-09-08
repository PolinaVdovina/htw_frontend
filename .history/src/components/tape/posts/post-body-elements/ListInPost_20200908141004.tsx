import React from 'react'
import { List, ListItem, Typography, useTheme } from '@material-ui/core';
import { BodyElementCompProps } from './post-body-element';

interface IListInPostProps extends BodyElementCompProps  {
    data: {
        title?: string | null,
        items: Array<string>,
        variant?: 'marker' | 'enum' | null
    }
}

export const ListInPost = (props: IListInPostProps) => {
    const theme = useTheme();
    return (
        <div>
            {alert(JSON.stringify(props.data.items))}
            <Typography style={{fontWeight:"bold", paddingLeft: theme.spacing(2)}}>
                {props.data.title + ":"}
            </Typography>
            <List style={{padding:0}}>
                {props.data.items.map(
                    (item, index) => 
                    <ListItem key={index}>
                        {props.data.variant=="enum" ? index+1 : "-"} {item}
                    </ListItem>
                )}
            </List>
        </div>
    )
} 

// export const createListInPost = (string) => {
//     return {
//         {
//             data: {
//                 title: props.data.title,

//             }
//         }
//     }
// }