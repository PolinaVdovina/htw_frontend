import * as React from 'react';
import { Typography, Card, TextField, CardContent, Grid, Paper, Link, FormControl, Input, Button, Divider } from '@material-ui/core';
import { ChangeComponent } from '../cabinet/ChangeComponent';
import { SETTINGS } from '../cabinet/accountSettings';
import { PaddingPaper } from './PaddingPaper';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { AccountCommonInfo } from './../cabinet/AccountCommonInfo';
import { genderIntToStr } from '../../utils/appliedFunc';


interface IPropsAccountInfo{
    role: string,
    data: {
        name: string,
        dateBirth: string,

    },
    settingsView: any
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

    render() {
        //alert(this.props.name)
        return( 
            <PaddingPaper style={{width:"100%"}}>
                <Grid container spacing={2} direction='column'>  
                    <Grid item>
                        <AccountCommonInfo roleSettings={this.props.role}/>
                    </Grid>
                    <Divider/>
                    <Grid item>
                        <Typography variant='h5'>
                            Общие данные
                        </Typography>    
                    </Grid>          
                    {this.props.settingsView.map(key => <>
                        <Grid container item direction="column">
                            <Typography style={{'color': '#808080'}}>
                                {SETTINGS[this.props.role][key].title}
                            </Typography> 
                            {this.props.data[key].isArray() && 
                                this.props.data[key].map(element =>
                                    <Grid item container direction='row' spacing={2} justify='space-between' style={{flexWrap:"nowrap"}}>
                                        <Grid item>
                                            <Typography>
                                                {element}                                                  
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
                                    </Grid>
                                )
                            }
                            <Grid item container direction='row' spacing={2} justify='space-between' style={{flexWrap:"nowrap"}}>                             
                                
                                
                                <Grid item>
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
                            
                            
                            </Grid>                        
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
            </PaddingPaper>            
        )
    }
}


export default connect(mapStateToProps)(AccountInfoComp);