import React from 'react'
import { List, ListItem, Typography, useTheme } from '@material-ui/core';
import { BodyElementCompProps } from './post-body-element';
import { Education } from '../../../cabinet/displayMiniComponents/Education';

interface IEducationInPost extends BodyElementCompProps  {
    data: {
        title?: string | null,
        items: any,
        variant?: 'marker' | 'enum' | null
    }
}

export const EducationInPost = (props: IEducationInPost) => {
    const theme = useTheme();
    return (
        <div>
            <Typography style={{fontWeight:"bold", paddingLeft: theme.spacing(2)}}>
                {props.data.title + ":"}
            </Typography>
            <List style={{padding:0}}>
                {props.data.items.map(
                    (item, index) => 
                    <ListItem key={index}>
                        {props.data.variant=="enum" ? index+1 : "-"} 
                        <Education
                            element={item}
                            link={item.institutionLogin}
                        />
                    </ListItem>
                )}
            </List>
        </div>
    )
} 