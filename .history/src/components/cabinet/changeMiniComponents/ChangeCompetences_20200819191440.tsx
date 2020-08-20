import * as React from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

interface IChangeCompetences {
    data: number,
    onChange: (any) => void,
    type: string
}

export const ChangeCompetences = (props : IChangeCompetences) => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return(
<List
      component="nav"
      aria-labelledby="nested-list-subheader"
      /*subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }*/
      //className={classes.root}
    >
      <ListItem button>
        <ListItemText primary="Sent mail" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Drafts" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse>
    </List>
    )
}


//onChange={(event) => props.onChange({[props.type]: event.target.value})}