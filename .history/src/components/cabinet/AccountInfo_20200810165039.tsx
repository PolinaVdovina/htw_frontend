import * as React from 'react';
import { Typography, Card, TextField, CardContent, Grid, Paper, Link, FormControl, Input, Button, Divider, withTheme, Radio } from '@material-ui/core';
import { ChangeComponent } from './ChangeComponent';
import { SETTINGS } from './accountSettings';
import { PaddingPaper } from '../cards/PaddingPaper';
import { RootState, store } from '../../redux/store';
import { connect, useDispatch } from 'react-redux';
import { AccountCommonInfo } from './AccountCommonInfo';
import { genderIntToStr, addressGlue, jobApplGlue } from '../../utils/appliedFunc';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { MessageStatus } from '../../utils/fetchInterfaces';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { CabinetContext } from './cabinet-context';


interface IPropsAccountInfo extends WithSnackbarProps{
    role: string,
    title?: string,
    data: {},
    settingsView: any,
    enqueueSnackbar: any,
    theme?: any,
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
        }
    }
}

class AccountInfoComp extends React.Component<IPropsAccountInfo, IStateAccountInfo> {
    static contextType = CabinetContext
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

    handleClickDeleteMass = async(key: string, index: number) => {
        const deleteData = this.context[key][index];
        const deleteFunc = SETTINGS[this.props.role][key]['deleteFunction'];

        if(deleteFunc) {
            await store.dispatch(startLoadingAction());
            const result = await deleteFunc(store.dispatch, deleteData);
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

    render() {
        return( 
            <Grid style={{padding:this.props.theme.spacing(2)}} container direction='column'>        
                { this.props.settingsView.map(key => <>
                    <Grid container item direction="column" style={{marginBottom: this.props.theme.spacing(2)}}>
                        <Grid item container direction='row' style={{flexWrap:"nowrap"}}>
                            <Typography style={{'color': '#808080'}}>
                                {SETTINGS[this.props.role][key].title}
                            </Typography> 
                            { (this.context.isMine && SETTINGS[this.props.role][key]['type'] && SETTINGS[this.props.role][key]['type'] == 'mass') &&
                                <Link 
                                    component='button'
                                    onClick={() => this.handleClickOpen(key)}
                                    style={{marginLeft: '10px'}}
                                >
                                    Добавить
                                </Link>
                            }
                        </Grid>
                        { (this.context[key] && SETTINGS[this.props.role][key]['type'] && SETTINGS[this.props.role][key]['type'] == 'mass') && 
                            this.context[key].map((element, index) => 
                                <Grid item container direction='row' spacing={2} style={{flexWrap:"nowrap"}}>
                                    <Grid item style={{flexGrow:1}}>
                                        <Typography>
                                            {
                                                (key == 'address' ? addressGlue(element) : 
                                                (key == 'jobApplicantSet' ? jobApplGlue(element) : element))
                                            }                                                  
                                        </Typography>
                                    </Grid>
                                    {
                                    this.context.isMine &&
                                    <Grid item>
                                        <Link 
                                            component='button'
                                            onClick={() => this.handleClickDeleteMass(key, index)}
                                        >
                                            Удалить
                                        </Link>
                                    </Grid>
                                    }
                                </Grid>
                            ) 
                        }
                        { (!SETTINGS[this.props.role][key]['type'] || SETTINGS[this.props.role][key]['type'] != 'mass') && 
                        <Grid item container direction='row' spacing={2}  style={{flexWrap:"nowrap"}}>                             
                            <Grid item style={{flexGrow:1, overflowX:"auto"}}>
                                {(!this.context.links || !this.context.links[key]) &&
                                    <Typography>
                                        {
                                            (this.context[key] ?
                                                (this.context[key].indexOf('null') == -1) ? this.context[key] : 'Не задано' :
                                                'Не задано')
                                        }
                                    </Typography>
                                }
                                {(this.context.links && this.context.links[key]) &&
                                    <Link
                                        color='inherit'
                                        underline='none'
                                        href={this.context.links[key]}
                                    >
                                        {this.context[key] ?
                                            (this.context[key].indexOf('null') == -1) ? this.context[key] : 'Не задано' :
                                            'Не задано'}
                                    </Link>
                                }                                
                            </Grid>
                            { SETTINGS[this.props.role][key].changeSettings && <>
                                {
                                this.context.isMine &&
                                <>
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
                                </>
                                }
                            </>}
                        
                        
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


export default withTheme( connect(mapStateToProps)(withSnackbar(AccountInfoComp)));