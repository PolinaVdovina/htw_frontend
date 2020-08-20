import * as React from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

interface IChangeCompetences {
    data: number,
    onChange: (any) => void,
    type: string,
    listItemsSelect: any
}

export const ChangeCompetences = (props : IChangeCompetences) => {
    const [open, setOpen] = React.useState(true);
    const [checked, setChecked] = React.useState([0]);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };

    return(
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            { Object.keys(props.listItemsSelect).map(group => <>
                <ListItem button onClick={handleClick}>
                    <ListItemText primary={group} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>                    
                    <List component="div" disablePadding>
                        { props.listItemsSelect[group].map(competence =>
                            <ListItem button>
                                <ListItemText primary={competence} />
                            </ListItem>
                        )}                   
                    </List>
                </Collapse>
            </>)}            
        </List>
    )
}


//onChange={(event) => props.onChange({[props.type]: event.target.value})}