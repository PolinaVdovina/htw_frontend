import * as React from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox, TextField, InputAdornment } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';

interface IChangeCompetences {
    data: number,
    onChange: (any) => void,
    type: string,
    list: any
}

export const ChangeCompetences = (props : IChangeCompetences) => {
    const [open, setOpen] = React.useState(new Array<boolean>(false));
    const [checked, setChecked] = React.useState(new Array<String>());
    const [resultChange, setResultChange] = React.useState(new Array())
    const [localList, setLocalList] = React.useState(props.list)

    const handleClick = (index: number) => {
        let tempArrayOpen = [...open];
        tempArrayOpen[index] = !tempArrayOpen[index];
        setOpen(tempArrayOpen);
    };

    const handleCheckGroup = (group: string) => {
        const currentIndex = checked.indexOf(group);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(group);
        } 
        else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        //выделение группы нормально не работает
        //localList[group].map(competence => {handleToggle(group, competence)})
    }

    const handleToggle = (group: string, competence: string) => {        
        const checkObject = group + ',' + competence;        
        const currentIndex = checked.indexOf(checkObject);
        const newChecked = [...checked];
        const newResultMass = [...resultChange]
    
        if (currentIndex === -1) {
            newChecked.push(checkObject);
            newResultMass.push({group, name: competence})
        } 
        else {
            newChecked.splice(currentIndex, 1);
            newResultMass.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
        setResultChange(newResultMass);
        props.onChange({[props.type]: newResultMass});
    };

    const handleSearch = (piece: string) => {        
        if (piece !== '') {
            let tempList = {};
            let tempArrayOpen = [...open];
            Object.keys(props.list).map((group, index) => {
                let groupSplit = group.split(/,| |-/);
                let flag = false;
                groupSplit.forEach(value => {
                    if (value.toString().toLowerCase().startsWith(piece.toLowerCase())) {
                        flag = true;
                    }
                })
                if (flag) tempList[group] = [];
                props.list[group].map(competence => {
                    let competenceSplit = competence.split(/,| |-/);
                    competenceSplit.forEach(value => {
                        if (value.toString().toLowerCase().startsWith(piece.toLowerCase())) {
                            if (!flag) {
                                tempList[group] = [];
                                flag = true;
                                tempList[group].push(competence)
                                tempArrayOpen[index] = true;     
                            }
                            else {
                                tempList[group].push(competence)
                            }                                                                                      
                        }
                    })
                })
            })
            setOpen(tempArrayOpen);    
            setLocalList(tempList);
        }
        else {
            setLocalList(props.list);
            setOpen(new Array<boolean>(false));
        }        
    }

    return(<>
        <TextField 
            variant='outlined' 
            size='small' 
            style={{flexGrow: 1, width: '100%'}}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            onChange={(event) => handleSearch(event.target.value)}
        />
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            { Object.keys(localList).map((group, index) => <>
                <ListItem /*button onClick={() => handleClick(index)} */style={{marginLeft: '25px', width: 'inherit'}}>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(group) !== -1}
                        tabIndex={-1}
                        disableRipple
                        onClick={() => handleCheckGroup(group)}
                    />
                    <ListItemText primary={group}/>
                    {open[index] ? <ExpandLess onClick={() => handleClick(index)}/> : <ExpandMore onClick={() => handleClick(index)}/>}
                </ListItem>
                <Collapse in={open[index]} timeout="auto" unmountOnExit>                    
                    <List component="div" disablePadding dense style={{marginLeft: '40px'}}>
                        { localList[group].map((competence, indexComp) =>                            
                            <ListItem button onClick={() => handleToggle(group, competence)}>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(group + ',' + competence) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                                <ListItemText primary={competence} />
                            </ListItem>
                        )}                   
                    </List>
                </Collapse>
            </>)}            
        </List>
    </>)
}

