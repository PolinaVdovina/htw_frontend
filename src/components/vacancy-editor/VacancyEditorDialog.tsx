import { makeStyles, Theme, createStyles, Grid, Avatar, TextField, Typography, useTheme, Dialog, useMediaQuery, Collapse, Tooltip } from "@material-ui/core";
import React from "react";
import { Button, LinearProgress, IconButton } from '@material-ui/core';
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
import { settingsExperience, settingsVacancyType, settingsEmployment } from '../cabinet/changeMiniComponents/changeSettings';
import { ChangeCompetences } from "../cabinet/changeMiniComponents/ChangeCompetences";
import { settingsCompetenceSet } from './../cabinet/changeMiniComponents/changeSettings';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
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
    id?: number,

    defaultValues?: any,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
            overflowY: "scroll",
            flexWrap: "nowrap",
            //flexShrink: 0,
            //
            //flexBasis:"auto"
        },
        header: {
            alignItems: "center",
            color: "white",
            paddingLeft: theme.spacing(2),
            backgroundColor: theme.palette.primary.main,
            flexShrink: 0,
            flexBasis: "auto"
        },
        fieldGrid: {
            marginBottom: theme.spacing(2),
            flexWrap: "nowrap",
            flexShrink: 0,
            flexBasis: "auto"

        },
        fieldTitle: {
            marginRight: theme.spacing(1),
            minWidth: "120px",
        }
    }),
);

function mapStateToProps(state: RootState) {
    return {
        phone: state.userPersonalsReducer.phone,
        address: state.userPersonalsReducer.address && state.userPersonalsReducer.address.length > 0 && state.userPersonalsReducer.address[0],
        token: state.authReducer.token,
    }
}

const VacancyEditorDialogComp = (props: IVacancyDialogProps) => {
    const startValues: any = {
        id: null,
        demands: [],
        duties: [],
        position: "",
        description: "",
        competencies: [],
        phone: props.phone ? props.phone : "",
        experience: null,
        minSalary: "",
        maxSalary: "",
        compOpen: false,
        vacancyType: "Работа",
        employment: "Полный день",
    }


    const [fieldValues, setFieldValues] = React.useState(startValues);
    const id = fieldValues.id;
    const demands = fieldValues.demands;
    const description = fieldValues.description;
    const position = fieldValues.position;
    const duties = fieldValues.duties;
    const address = fieldValues.address;
    const phone = fieldValues.phone;
    const experience = fieldValues.experience;
    const minSalary = fieldValues.minSalary;
    const maxSalary = fieldValues.maxSalary;
    const compOpen = fieldValues.compOpen;
    const vacancyType = fieldValues.vacancyType;
    const employment = fieldValues.employment;
    const competencies = fieldValues.competencies;

    const setPosition = (position?: string | null) => { setFieldValues(old => ({ ...old, position })) }
    const setDuties = (duties?: Array<any>) => { setFieldValues(old => ({ ...old, duties })) }
    const setDemands = (demands?: Array<any>) => { setFieldValues(old => ({ ...old, demands })) }
    const setDescription = (description?: string | null) => { setFieldValues(old => ({ ...old, description })) }
    const setCompetencies = (competencies?: Array<any>) => { setFieldValues(old => ({ ...old, competencies })) }
    const setAddress = (address?: any) => { setFieldValues(old => ({ ...old, address })) }
    const setExperience = (experience?: any) => { setFieldValues(old => ({ ...old, experience })) }
    const setMinSalary = (minSalary?: string | null) => { setFieldValues(old => ({ ...old, minSalary })) }
    const setMaxSalary = (maxSalary?: string | null) => { setFieldValues(old => ({ ...old, maxSalary })) }
    const setPhone = (phone?: string | null) => { setFieldValues(old => ({ ...old, phone })) }
    const setCompOpen = (compOpen?: boolean) => { setFieldValues(old => ({ ...old, compOpen })) }
    const setVacancyType = (vacancyType?: string | null) => { setFieldValues(old => ({ ...old, vacancyType })) }
    const setEmployment = (employment?: string | null) => { setFieldValues(old => ({ ...old, employment })) }

    //  const [demands, setDemands] = React.useState([]);
    // const [duties, setDuties] = React.useState([]);
    // const [position, setPosition] = React.useState(props.defaultValues && props.defaultValues.position);
    // const [description, setDescription] = React.useState('');
    // const [competencies, setCompetencies] = React.useState([]);
    // const [address, setAddress] = React.useState<any>();
    // const [phone, setPhone] = React.useState(props.phone ? props.phone : '');
    // const [experience, setExperience] = React.useState<any>();
    // const [minSalary, setMinSalary] = React.useState("");
    // const [maxSalary, setMaxSalary] = React.useState("");
    // const [compOpen, setCompOpen] = React.useState(false);
    // const [vacancyType, setVacancyType] = React.useState("Работа");
    // const [employment, setEmployment] = React.useState("Полный день"); 



    const dispatch = useDispatch();
    //alert("min " + minSalary)
    //alert("max " + maxSalary)

    const classes = useStyles();
    const theme = useTheme();
    const snackbar = useSnackbar();

    const setSalary = (value, type: "MIN" | "MAX") => {
        const setFunc = (type == "MAX") ? setMaxSalary : setMinSalary;
        // alert(type);
        if (validateNumber(value) || value == '') {
            //alert(value);
            setFunc(value);

        }
    }

    const validateFormData = () => {
        if (position == "") {
            snackbar.enqueueSnackbar("Введите должность", { variant: 'error' });
            return false;
        }
        if (phone != '' && !validatePhone(phone)) {
            snackbar.enqueueSnackbar("Телефон введен неверно", { variant: 'error' });
            return false;
        }
        if (address) {
            const addressParsed = addressGlue(address);
            if (!addressParsed && addressParsed != '' && !validateAddress(addressParsed)) {
                snackbar.enqueueSnackbar("Адрес введен неверно", { variant: 'error' });
                return false;
            }
        }
        return true;
    }

    const reset = () => {
        setFieldValues(startValues);
        // setDemands([]);
        // setDuties([]);
        // setPosition("");
        // setDescription("");
        // setCompetencies([]);
        // //setAddress(null);
        // //setPhone(props.phone ? props.phone : '');
        // setExperience(null);
        // setMinSalary("");
        // setMaxSalary("");
    }

    React.useEffect(
        () => {
            if (props.defaultValues)
                setFieldValues(props.defaultValues)
            else
                setFieldValues(startValues)
        }, [props.defaultValues]
    )

    const validateAndPackageFormData = async () => {
        if (!validateFormData())
            return;
        let data = {};
        data['demands'] = demands.filter(demand => demand['value'] != null && demand['value'] != '').map(demand => demand['value']);
        data['duties'] = duties.filter(duty => duty['value'] != null && duty['value'] != '').map(duty => duty['value']);;
        data['description'] = description;
        data['competencies'] = competencies;
        if (address) {
            if(address.value) {
                const a = addressGlue(strToAddressDictionary(address.value).address);
                if (a)
                    data['address'] = strToAddressDictionary(a).address;
            }
        }
        data['experience'] = experience;
        data['phone'] = phone;
        data['vacancyType'] = vacancyType;
        data['employment'] = employment;
        if (props.id)
            data['id'] = props.id;
        const minS = (parseInt(minSalary) > parseInt(maxSalary)) ? maxSalary : minSalary;
        const maxS = (parseInt(maxSalary) < parseInt(minSalary)) ? minSalary : maxSalary;
        if (minS != "")
            data['minSalary'] = parseInt(minS);

        if (maxS != "")
            data['maxSalary'] = parseInt(maxS);
        data['position'] = position;
        if (fieldValues.id)
            data['id'] = id;

        if (props.token) {
            await dispatch(startLoadingAction())
            const addedVacancyData = await addVacancyFetch(props.token, data);
            if (addedVacancyData.msgInfo.msgStatus == MessageStatus.OK) {
                snackbar.enqueueSnackbar("Вакансия добавлена", { variant: 'success' });
                reset();
                props.onSubmitSuccess && props.onSubmitSuccess(addedVacancyData.data);

            }
            else {
                snackbar.enqueueSnackbar("Не удалось добавить вакансию", { variant: 'error' });
            }
            await dispatch(stopLoadingAction())
        }
    }



    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    return (
        <Dialog fullWidth fullScreen={fullScreen} open={props.open}
            PaperProps={{ style: { overflow: "hidden" } }}>
            <Grid container className={classes.header}>
                <Typography
                    style={{ flexGrow: 1, color: "white" }}
                    key="title"
                >
                    {(props.defaultValues && props.defaultValues.id ) ? "Редактировать вакансию" : "Добавить вакансию"}
                </Typography>
                {
                    props.onClose &&
                    <IconButton onClick={props.onClose} style={{ color: "white" }}>
                        <CloseIcon />
                    </IconButton>
                }
            </Grid>

            <Grid container direction="column" className={classes.root}>
                {/* <Typography variant="h5" style={{marginBottom: theme.spacing(2), textAlign: "center"}}>Добавить вакансию</Typography> */}
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Должность</Typography>
                    <TextField
                        autoFocus
                        fullWidth
                        variant="outlined"
                        value={position}
                        onChange={(event) => setPosition(event.target.value)}
                        size="small" />
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Зарплата, руб.</Typography>
                    <Grid item container direction="row" style={{ flexWrap: "nowrap", alignItems: "center" }}>
                        <Grid item container alignItems="center" style={{ width: "auto", flexGrow: 1, paddingRight: theme.spacing(2) }}>
                            <Typography style={{ marginRight: theme.spacing(1) }}>
                                {((maxSalary != '') && (parseInt(minSalary) > parseInt(maxSalary))) ? "До" : "От"}
                            </Typography>
                            <TextField
                                value={minSalary}
                                onChange={(event) => setSalary(event.target.value, "MIN")}
                                variant="outlined"
                                size="small"
                                style={{ flexGrow: 1 }} />
                        </Grid>
                        <Grid item container alignItems="center" style={{ width: "auto", flexGrow: 1, paddingLeft: theme.spacing(2) }}>
                            <Typography style={{ marginRight: theme.spacing(1) }}>
                                {((minSalary != '') && (parseInt(minSalary) > parseInt(maxSalary))) ? "От" : "До"}
                            </Typography>
                            <TextField
                                onChange={(event) => setSalary(event.target.value, "MAX")}
                                value={maxSalary}
                                variant="outlined"
                                size="small"
                                style={{ flexGrow: 1 }} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Опыт работы</Typography>
                    <ChangeListOneSelect
                        fullWidth type="value"
                        value={experience}
                        onChange={(data) => setExperience(data.value)}
                        list={settingsExperience.experience.listItemsSelect} />
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Описание</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        multiline
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        size="small" />
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Grid alignItems="center" item container style={{ flexWrap: "nowrap" }}>
                        <Typography className={classes.fieldTitle}>Требуемые компетенции</Typography>
                        <Tooltip title={compOpen ? "Скрыть список" : "Показать список"}>
                            <IconButton onClick={() => setCompOpen(!compOpen)}>
                                {compOpen ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </Tooltip>
                    </Grid>

                    <Collapse in={compOpen}>
                        <ChangeCompetences 
                            defaultValue={props.defaultValues && props.defaultValues.competencies.map(el => el.group + "," + el.name)}
                            type='competenceSet'
                            onChange={(data) => { setCompetencies(data['competenceSet']) }} 
                            list={settingsCompetenceSet.competenceSet.listItemsSelect}
                        />
                    </Collapse>
                    {/*                     <ChangeMultiSelect
                    onChange={(data) => {setCompetencies(data)}}
                    fullWidth
                    value={competencies}
                    list={["Пить чай", "Страдать херней"]}
                    type='competenceSet'/> */}
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Контактный телефон</Typography>
                    <TextField
                        value={phone}
                        fullWidth
                        variant="outlined"
                        multiline
                        onChange={(event) => setPhone(event.target.value)}
                        size="small" />
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Адрес</Typography>
                    <AddressSuggestions
                        value={address}
                        token="552dfb218ca6ea603908fc2391f8da0fa97a6cd6"
                        onChange={(object) => {
                            if (object) {
                                //const addr = addressGlue(strParser(object.value).address) 
                                setAddress(object)
                                //addr  && setAddress(addr);
                            }
                        }
                        }
                    />
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>Тип занятости</Typography>
                    <ChangeListOneSelect
                        value={vacancyType}
                        type="type"
                        list={settingsVacancyType.vacancyTypes.listItemsSelect}
                        onChange={(data) => { setVacancyType(data.type) }}
                        fullWidth
                    />
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <Typography className={classes.fieldTitle}>График работы</Typography>
                    <ChangeListOneSelect
                        value={employment}
                        type="type"
                        list={settingsEmployment.employment.listItemsSelect}
                        onChange={(data) => { setEmployment(data.type) }}
                        fullWidth
                    />
                </Grid>
                <Grid item container direction="column" className={classes.fieldGrid}>
                    <ListEditor onChange={setDuties} title="Обязанности" elementValues={duties} />
                </Grid>

                <Grid item container direction="column" className={classes.fieldGrid}>
                    <ListEditor onChange={setDemands} title="Требования" elementValues={demands} />
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={() => validateAndPackageFormData()}
                style={{
                    flexGrow: 1,
                    borderRadius: 0,
                    flexShrink: 0,
                    flexBasis: "auto"
                }}
            >
                {(props.defaultValues && props.defaultValues.id ) ? "Редактировать" : "Добавить"}
            </Button>
        </Dialog>
    )
}

export const VacancyEditorDialog = connect(mapStateToProps)(VacancyEditorDialogComp);