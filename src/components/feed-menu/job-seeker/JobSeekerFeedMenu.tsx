import * as React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Divider, Tabs } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

interface IJobSeekerFeedMenuProps {
    title?: String,
}

export const JobSeekerFeedMenu = (props : IJobSeekerFeedMenuProps) => {
    const [isDrawerOpen, setDrawerOpen] = React.useState(false);

    return (
        <Tabs
            orientation="vertical"
            variant="scrollable"
        >
            <ListItem button>
                <ListItemText primary= "Рекомендации"/>
                <ExpandMore/>
            </ListItem>
            <ListItem button>
                <ListItemText primary= "Поиск"/>
            </ListItem>
            <Divider/>
            <ListItem button>
                <ListItemText primary= "Избранное"/>
            </ListItem>
        </Tabs>
    )
}