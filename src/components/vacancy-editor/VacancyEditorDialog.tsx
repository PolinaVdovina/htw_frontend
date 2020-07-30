import { makeStyles, Theme, createStyles, Grid, Avatar, TextField, Typography, useTheme, Dialog } from "@material-ui/core";
import React from "react";
import { Button, LinearProgress } from '@material-ui/core';
import { withTheme } from 'react-jsonschema-form';

import { Theme as MaterialUITheme } from '@rjsf/material-ui';
import { ChangeExperience } from '../cabinet/changeMiniComponents/ChangeExperience';
import { ChangeMultiSelect } from '../cabinet/changeMiniComponents/ChangeMultiSelect';
import { ListEditor } from "./ListEditor";
import { useSnackbar } from 'notistack';
import { validatePhone } from "../../utils/validateFunctions";
import { validateAddress } from './../../utils/validateFunctions';
import { RootState } from "../../redux/store";
import { connect } from 'react-redux';
import { AddressSuggestions } from "react-dadata";
import { addressGlue } from './../../utils/appliedFunc';

//Ненагло спизжено у Богини спизженности
function strParser(str/*: string*/) {
    let strArray = str.split(', ');
    for (let i = 0; i<strArray.length; i++) {
        if (strArray[i].endsWith('р-н'))
            strArray.splice(i, 1);
    }
    let data = {
        address: {
            country: 'Россия',
            region: strArray[0] ? strArray[0] : null,
            city: strArray[1] ? strArray[1].replace('г ', '') : null,
            street: strArray[2] ? strArray[2] : null,
            house: strArray[3] ? strArray[3].replace('д ', '') : null,
            flat: strArray[4] ? strArray[4].replace('кв ', '') : null,
        }
    };
    return data;
}

interface IVacancyDialogProps {
    onClose?: () => void,
    onSubmit?: (data) => void,
    open: boolean,
    address?: string,
    phone?: string,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding:theme.spacing(2),
        },
        fieldGrid: {
            marginBottom: theme.spacing(2),
        },
        fieldTitle: {
            marginRight: theme.spacing(1),
            minWidth: "120px"
        }
    }),
);

function mapStateToProps(state : RootState) {
    return {
        phone: state.userPersonalsReducer.phone,
        address: state.userPersonalsReducer.address && state.userPersonalsReducer.address.length > 0 && state.userPersonalsReducer.address[0]
    }
}

const VacancyEditorDialogComp = (props: IVacancyDialogProps) => {
    const [demands, setDemands] = React.useState([]);
    const [duties, setDuties] = React.useState([]);
    const [description, setDescription] = React.useState('');
    const [competencies, setCompetencies] = React.useState([]);
    const [address, setAddress] = React.useState(props.address ? props.address : '');
    const [phone, setPhone] = React.useState(props.phone ? props.phone : '');
    const [experience, setExperience] = React.useState();

    const classes = useStyles();
    const theme = useTheme();
    const snackbar = useSnackbar();

    const validateFormData = () => {
        if( phone != '' && !validatePhone(phone)) {
            snackbar.enqueueSnackbar("Телефон введен неверно", {variant:'error'});    
            return false;
        }
        if(!address && address!='' && !validateAddress(address)) {
            snackbar.enqueueSnackbar("Адрес введен неверно", {variant:'error'});  
            return false;
        }
        return true;
    }
    
    const validateAndPackageFormData = () => {
        if(!validateFormData())
            return;
        let data = {};
        data['demands'] = demands.filter(demand => demand['value'] != null && demand['value'] != '').map(demand => demand['value']);
        data['duties'] = duties.filter(duty => duty['value'] != null && duty['value'] != '').map(duty => duty['value']);;
        data['description'] = description;
        data['competencies'] = competencies;
        data['address'] = address;
        data['experience'] = experience;
        data['phone'] = phone;
        alert(JSON.stringify(data))
        props.onSubmit && props.onSubmit(data);
    } 

    return (
        <Dialog  fullWidth open={props.open}>
            <Grid container direction="column" className={classes.root}>
                <Typography variant="h5" style={{marginBottom: theme.spacing(2), textAlign: "center"}}>Добавить вакансию</Typography>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Должность</Typography>
                    <TextField
                    fullWidth
                    variant="outlined"
                    size="small"/>
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Опыт работы</Typography>
                    <ChangeExperience fullWidth type="value" onChange={(data)=>setExperience(data.value)}/>
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Описание</Typography>
                    <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    onChange={(event)=>setDescription(event.target.value)}
                    size="small"/>
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Требуемые компетенции</Typography>
                    <ChangeMultiSelect
                    onChange={(data) => {setCompetencies(data)}}
                    fullWidth
                    list={["Пить чай", "Страдать херней"]}/>
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Контактный телефон</Typography>
                    <TextField
                    value={phone}
                    fullWidth
                    variant="outlined"
                    multiline
                    onChange={(event)=>setPhone(event.target.value)}
                    size="small"/>
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Адрес</Typography>
                    <AddressSuggestions
                    token="552dfb218ca6ea603908fc2391f8da0fa97a6cd6" 
                    onChange={(object) => {
                            if(object) {
                                 const addr = addressGlue(strParser(object.value).address) 
                                
                                 addr  && setAddress(addr);
                            }
                        }
                    }        
                />
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <ListEditor onChange={setDemands} title="Обязанности" elementValues={demands}/>
                </Grid>

                <Grid item container direction="column" className={classes.fieldGrid}>
                    <ListEditor onChange={setDuties} title="Требования" elementValues={duties}/>
                </Grid>
                <Grid item container direction="row">
                    <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => validateAndPackageFormData()}  
                    style={{flexGrow:1, marginRight:theme.spacing(2)}}>Добавить вакансию</Button>

                    <Button variant="contained" onClick={() => props.onClose && props.onClose()}>Выйти</Button>
                </Grid>

            </Grid>
        </Dialog>
    )
}

export const VacancyEditorDialog = connect(mapStateToProps)(VacancyEditorDialogComp);