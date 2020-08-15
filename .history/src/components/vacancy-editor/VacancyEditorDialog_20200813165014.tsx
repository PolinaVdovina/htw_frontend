import { makeStyles, Theme, createStyles, Grid, Avatar, TextField, Typography, useTheme, Dialog } from "@material-ui/core";
import React from "react";
import { Button, LinearProgress } from '@material-ui/core';
import { withTheme } from 'react-jsonschema-form';

import { Theme as MaterialUITheme } from '@rjsf/material-ui';
import { ChangeListOneSelect } from '../cabinet/changeMiniComponents/ChangeListOneSelect';
import { ChangeMultiSelect } from '../cabinet/changeMiniComponents/ChangeMultiSelect';
import { ListEditor } from "./ListEditor";
import { useSnackbar } from 'notistack';
import { validatePhone, validateNumber } from "../../utils/validateFunctions";
import { validateAddress } from './../../utils/validateFunctions';
import { RootState } from "../../redux/store";
import { connect, useDispatch } from 'react-redux';
import { AddressSuggestions } from "react-dadata";
import { addressGlue, strToAddressDictionary } from './../../utils/appliedFunc';
import { addVacancyFetch } from './../../utils/fetchFunctions';
import { MessageStatus } from "../../utils/fetchInterfaces";
import { startLoadingAction, stopLoadingAction } from './../../redux/actions/dialog-actions';
import { settingsExperience } from "../cabinet/changeMiniComponents/changeSettings";

// //Ненагло спизжено у Богини спизженности
// function strParser(str/*: string*/) {
//     let strArray = str.split(', ');
//     for (let i = 0; i<strArray.length; i++) {
//         if (strArray[i].endsWith('р-н'))
//             strArray.splice(i, 1);
//     }
//     let data = {
//         address: {
//             country: 'Россия',
//             region: strArray[0] ? strArray[0] : null,
//             city: strArray[1] ? strArray[1].replace('г ', '') : null,
//             street: strArray[2] ? strArray[2] : null,
//             house: strArray[3] ? strArray[3].replace('д ', '') : null,
//             flat: strArray[4] ? strArray[4].replace('кв ', '') : null,
//         }
//     };
//     return data;
// }

interface IVacancyDialogProps {
    onClose?: () => void,
    onSubmitSuccess?: (data) => void,
    open: boolean,
    address?: string,
    phone?: string,
    token?: string | null,
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
        address: state.userPersonalsReducer.address && state.userPersonalsReducer.address.length > 0 && state.userPersonalsReducer.address[0],
        token: state.authReducer.token,
    }
}

const VacancyEditorDialogComp = (props: IVacancyDialogProps) => {
    const [demands, setDemands] = React.useState([]);
    const [duties, setDuties] = React.useState([]);
    const [position, setPosition] = React.useState("");
    const [description, setDescription] = React.useState('');
    const [competencies, setCompetencies] = React.useState([]);
    const [address, setAddress] = React.useState<any>();
    const [phone, setPhone] = React.useState(props.phone ? props.phone : '');
    const [experience, setExperience] = React.useState();
    const [minSalary, setMinSalary] = React.useState("");
    const [maxSalary, setMaxSalary] = React.useState("");
    const dispatch = useDispatch();
    //alert("min " + minSalary)
    //alert("max " + maxSalary)

    const classes = useStyles();
    const theme = useTheme();
    const snackbar = useSnackbar();

    const setSalary = (value, type: "MIN" | "MAX") => {
        const setFunc = (type=="MAX") ? setMaxSalary : setMinSalary;
       // alert(type);
        if(validateNumber(value) || value=='')  {
            //alert(value);
            setFunc(value);

        } 
    }

    const validateFormData = () => {
        if(position == "") {
            snackbar.enqueueSnackbar("Введите должность", {variant:'error'});  
            return false;
        } 
        if( phone != '' && !validatePhone(phone)) {
            snackbar.enqueueSnackbar("Телефон введен неверно", {variant:'error'});    
            return false;
        }
        if(address) {
            const addressParsed = addressGlue(address);
            if(!addressParsed && addressParsed!='' && !validateAddress(addressParsed)) {
                snackbar.enqueueSnackbar("Адрес введен неверно", {variant:'error'});  
                return false;
            }
        }
        return true;
    }
    
    const validateAndPackageFormData = async () => {
        if(!validateFormData())
            return;
        let data = {};
        data['demands'] = demands.filter(demand => demand['value'] != null && demand['value'] != '').map(demand => demand['value']);
        data['duties'] = duties.filter(duty => duty['value'] != null && duty['value'] != '').map(duty => duty['value']);;
        data['description'] = description;
        data['competencies'] = competencies;
        if(address) {
            const a = addressGlue(strToAddressDictionary(address.value).address);
            if(a)
                data['address'] = strToAddressDictionary (a).address;
        }
        data['experience'] = experience;
        data['phone'] = phone;

        const minS = (parseInt(minSalary) > parseInt(maxSalary)) ? maxSalary : minSalary;
        const maxS = (parseInt(maxSalary) < parseInt(minSalary)) ? minSalary : maxSalary;
        if(minS != "")
            data['minSalary'] = parseInt(minS);
        
        if(maxS != "")
            data['maxSalary'] = parseInt(maxS);
        data['position'] = position;
        //alert(JSON.stringify(data))
        
        if(props.token) {
            await dispatch(startLoadingAction())
            const addedVacancyData = await addVacancyFetch( props.token, data );
            if(addedVacancyData.msgStatus == MessageStatus.OK) {
                snackbar.enqueueSnackbar("Вакансия добавлена", {variant:'success'});  
                props.onSubmitSuccess && props.onSubmitSuccess(data);
            }
            else {
                snackbar.enqueueSnackbar("Не удалось добавить вакансию", {variant:'error'});  
            }
            await dispatch(stopLoadingAction())
        }

       
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
                    value={position}
                    onChange={(event) => setPosition(event.target.value) }
                    size="small"/>
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Зарплата, руб.</Typography>
                    <Grid item container direction="row" style={{flexWrap:"nowrap", alignItems:"center"}}>
                        <Grid item container alignItems="center" style={{width:"auto", flexGrow:1, paddingRight: theme.spacing(2)}}>
                            <Typography style={{marginRight: theme.spacing(1)}}>
                                {((maxSalary!='') && (parseInt(minSalary) > parseInt(maxSalary))) ? "До" : "От"}
                            </Typography>
                            <TextField
                            value={minSalary}
                            onChange={(event) => setSalary(event.target.value, "MIN")}
                            variant="outlined"
                            size="small"
                            style={{flexGrow:1}}/>
                        </Grid>
                        <Grid item container alignItems="center" style={{width:"auto", flexGrow:1, paddingLeft: theme.spacing(2)}}>
                            <Typography style={{marginRight: theme.spacing(1)}}>
                            {((minSalary!='') && (parseInt(minSalary) > parseInt(maxSalary))) ? "От" : "До"}
                            </Typography>
                            <TextField
                            onChange={(event) => setSalary(event.target.value, "MAX")}
                            value={maxSalary}
                            variant="outlined"
                            size="small"
                            style={{flexGrow:1}}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Опыт работы</Typography>
                    <ChangeListOneSelect 
                    fullWidth type="value" 
                    value={experience} 
                    onChange={(data)=>setExperience(data.value)}
                    list={settingsExperience.listItemsSelect}/>
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Описание</Typography>
                    <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    value={description}
                    onChange={(event)=>setDescription(event.target.value)}
                    size="small"/>
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Требуемые компетенции</Typography>
                    <ChangeMultiSelect
                    onChange={(data) => {setCompetencies(data)}}
                    fullWidth
                    value={competencies}
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
                    value={address}
                    token="552dfb218ca6ea603908fc2391f8da0fa97a6cd6" 
                    onChange={(object) => {
                            if(object) {
                                 //const addr = addressGlue(strParser(object.value).address) 
                                setAddress(object)
                                 //addr  && setAddress(addr);
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
                    style={{flexGrow:1, marginRight:theme.spacing(2)}}>Добавить</Button>

                    <Button variant="contained" onClick={() => props.onClose && props.onClose()}>Выйти</Button>
                </Grid>

            </Grid>
        </Dialog>
    )
}

export const VacancyEditorDialog = connect(mapStateToProps)(VacancyEditorDialogComp);