import * as React from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Alert from '@material-ui/lab/Alert';

interface IChangeCompetences {
    data: number,
    onChange: (any) => void,
    type: string,
    list: any
}

export const ChangeCompetences = (props : IChangeCompetences) => {
    const [open, setOpen] = React.useState(new Array<boolean>(false));
    const [checked, setChecked] = React.useState([0]);

    const handleClick = (index: number) => {
        let tempArrayOpen = [...open];
        tempArrayOpen[index] = !tempArrayOpen[index];
        setOpen(tempArrayOpen);
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
            <Alert>dkcmodkmvokk</Alert>
            { Object.keys(props.list).map((group, index) => <>
                <ListItem button onClick={() => handleClick(index)}>
                    <ListItemText primary={group} />
                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open[index]} timeout="auto" unmountOnExit>                    
                    <List component="div" disablePadding style={{marginLeft: '20px'}}>
                        { props.list[group].map((competence, indexComp) =>                            
                            <ListItem button /*onClick={handleToggle(index)}*/>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(index) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    //inputProps={{ 'aria-labelledby': labelId }}
                                />
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