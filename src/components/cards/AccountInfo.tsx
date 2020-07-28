import * as React from 'react';
import { Typography, Card, TextField, CardContent, Grid, Paper, Link, FormControl, Input, Button, Divider } from '@material-ui/core';
import { ChangeComponent } from '../cabinet/ChangeComponent';
import { SETTINGS } from '../cabinet/accountSettings';
import { PaddingPaper } from './PaddingPaper';
import { RootState, store } from '../../redux/store';
import { connect, useDispatch } from 'react-redux';
import { AccountCommonInfo } from './../cabinet/AccountCommonInfo';
import { genderIntToStr, addressGlue } from '../../utils/appliedFunc';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { MessageStatus } from '../../utils/fetchInterfaces';
import { withSnackbar, WithSnackbarProps } from 'notistack';


interface IPropsAccountInfo extends WithSnackbarProps{
    role: string,
    title?: string,
    data: {
        name: string,
        dateBirth: string,
        address: any
    },
    settingsView: any,
    enqueueSnackbar: any
}

interface IStateAccountInfo{
    hidden: {
        email?: boolean,
        phone?: boolean,
        name?: boolean,
        address?: boolean,
        datebirth?: boolean
    }
}

function mapStateToProps(state : RootState) {
    return {
        data: { 
            name: state.userPersonalsReducer.surname + ' ' + state.userPersonalsReducer.name + ' ' + state.userPersonalsReducer.middlename,
            dateBirth: '' + state.userPersonalsReducer.dateBirth,
            phone: '' + state.userPersonalsReducer.phone,
            email: '' + state.userPersonalsReducer.email,
            address: state.userPersonalsReducer.address,
            inn: '' + state.userPersonalsReducer.inn,
            ogrn: '' + state.userPersonalsReducer.ogrn,
            gender: state.userPersonalsReducer.gender,
        }
    }
}

class AccountInfoComp extends React.Component<IPropsAccountInfo, IStateAccountInfo> {
    constructor(props) {       
        super(props);
        this.state = {
            hidden: {
                email: false,
                phone: false,
                name: false,
                address: false,
                datebirth: false
            }
        }
    }

    handleClickClose = (key: string) => {
        this.setState({'hidden': {[key]: false}})
    }

    handleClickSave = (key: string) => {
        this.handleClickClose(key)
    }

    handleClickOpen = (key: string) => {
        this.setState({'hidden': {[key]: true}})
    }

    handleClickDelete = async(key: string) => {
        const changeFunc = SETTINGS[this.props.role][key]['changeFunction'];
        
        if(changeFunc) {
            await store.dispatch(startLoadingAction());
            const result = await changeFunc(store.dispatch, {[key]: null});
            await store.dispatch(stopLoadingAction());
            if(result.msgStatus == MessageStatus.OK) {
                this.props.enqueueSnackbar('Данные сохранены', {variant: "success"});
            }
            else {
                this.props.enqueueSnackbar('Не удалось изменить данные из-за проблем с соединением', {variant: "error"})
            }
        }
        else {
            this.props.enqueueSnackbar('Ошибка функции', {variant: "error"});
        }
    }

    handleClickDeleteMass = async(key: string) => {
        
    }

    render() {
        //alert(this.props.name)
        //alert(JSON.stringify(this.props.data.address))
        return( 

            <Grid container spacing={2} direction='column'>  

                <Grid item>
                    <Typography variant='h5'>
                        {this.props.title ? this.props.title : "Общие данные"}
                    </Typography>    
                </Grid>          
                { this.props.settingsView.map(key => <>
                    <Grid container item direction="column">
                        <Grid item container direction='row' style={{flexWrap:"nowrap"}}>
                            <Typography style={{'color': '#808080'}}>
                                {SETTINGS[this.props.role][key].title}
                            </Typography> 
                            { Array.isArray(this.props.data[key]) &&
                                <Link 
                                    component='button'
                                    onClick={() => this.handleClickOpen(key)}
                                    style={{marginLeft: '10px'}}
                                >
                                    Добавить
                                </Link>
                            }
                        </Grid>
                        { (this.props.data[key] && Array.isArray(this.props.data[key])) && 
                            this.props.data[key].map(element =>
                                <Grid item container direction='row' spacing={2} style={{flexWrap:"nowrap"}}>
                                    
                                    <Grid item style={{flexGrow:1}}>
                                        <Typography>
                                            {key == 'address' ? addressGlue(element) : element}                                                  
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Link 
                                            component='button'
                                            onClick={() => this.handleClickDeleteMass(key)}
                                        >
                                            Удалить
                                        </Link>
                                    </Grid>
                                </Grid>
                            )
                        }
                        { !Array.isArray(this.props.data[key]) && 
                        <Grid item container direction='row' spacing={2}  style={{flexWrap:"nowrap"}}>                             
                            
                            <Grid item style={{flexGrow:1}}>
                                <Typography>
                                    {
                                        this.props.data[key] ?
                                            (this.props.data[key].indexOf('null') == -1) ? this.props.data[key] : 'Не задано' :
                                            'Не задано'
                                    }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Link 
                                    component='button'
                                    onClick={() => this.handleClickOpen(key)}
                                >
                                    Изменить
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link 
                                    component='button'
                                    onClick={() => this.handleClickDelete(key)}
                                >
                                    Удалить
                                </Link>
                            </Grid>
                        
                        
                        </Grid> }                       
                    </Grid>

                    {this.state.hidden[key] &&
                        <ChangeComponent
                            handleClickClose={() => this.handleClickClose(key)}
                            handleClickSave={() => this.handleClickSave(key)}
                            type={key}
                            role={this.props.role}
                            key={key}
                        />
                    }
                </>)
            } 
            </Grid>                                   
 
        )
    }
}


export default connect(mapStateToProps)(withSnackbar(AccountInfoComp));