import React from 'react'
import { List, ListItem, Typography, useTheme } from '@material-ui/core';
import { BodyElementCompProps } from './post-body-element';



interface IStatementInPostItem  {
    title: String,
    value: String,
}

interface IStatementsInPostProps extends BodyElementCompProps  {
    data: {
        statements: Array<IStatementInPostItem>,
        variant?: 'marker' | 'enum' | null
    }
}


export const StatementInPost = (props: IStatementsInPostProps) => {
    const theme = useTheme();

    return (
        <div>
            {props.data.statements.map(statement =>
                <Typography style={{paddingLeft: theme.spacing(2)}}>
                    {statement.title}: {statement.value}
                </Typography>
            )}
        </div>
    )
} 