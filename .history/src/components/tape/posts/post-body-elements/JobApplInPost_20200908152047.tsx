import React from 'react'
import { List, ListItem, Typography, useTheme } from '@material-ui/core';
import { BodyElementCompProps } from './post-body-element';
import { Education } from '../../../cabinet/displayMiniComponents/Education';
import { JobApplicant } from '../../../cabinet/displayMiniComponents/JobApplicant';

interface IJobApplInPost extends BodyElementCompProps  {
    data: {
        title?: string | null,
        items: any,
        variant?: 'marker' | 'enum' | null
    }
}

export const JobApplInPost = (props: IJobApplInPost) => {
    const theme = useTheme();
    return (
        <div>
            <Typography style={{fontWeight:"bold", paddingLeft: theme.spacing(2)}}>
                {props.data.title + ":"}
            </Typography>
            {props.data.items.map(item =>
                <div style={{paddingLeft: '30px', marginTop: '7px'}}>
                    <JobApplicant
                        element={item}
                        link={undefined}
                    />
                </div>
            )}
        </div>
    )
} 