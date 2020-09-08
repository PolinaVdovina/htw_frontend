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
            {props.data.items.map(item =>
                <div style={{paddingLeft: '20px'}}>
                    <Education
                        element={item}
                        link={item.institutionLogin}
                    />
                </div>
            )}
        </div>
    )
} 