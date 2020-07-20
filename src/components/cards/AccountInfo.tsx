import * as React from 'react';
import { Typography, Card, TextField, CardContent, Grid, Paper, Link, FormControl, Input, Button } from '@material-ui/core';
import { ChangeComponent } from '../cabinet/ChangeComponent';
import { SETTINGS } from '../cabinet/accountSettings';
import { PaddingPaper } from './PaddingPaper';


interface IPropsAccountInfo{
    role: string
}

interface IStateAccountInfo{
    data: {
        email: string,
        phone: string,
        name: string,
        address: string,
        datebirth: string
    },
    hidden: {
        email: boolean,
        phone: boolean,
        name: boolean,
        address: boolean,
        datebirth: boolean
    }
}

export default class AccountInfo extends React.Component<IPropsAccountInfo, IStateAccountInfo> {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: 'polina@mail.ru',
                phone: '+79059770013',
                name: 'Вдовина Полина Владимировна',
                address: 'Россия, г Норильск, ул Молодежная, д 27, кв 62',
                datebirth: '09.12.1998'
            },
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
        this.setState({'hidden': {...this.state.hidden, [key]: false}})
    }

    handleClickSave = (key: string) => {
        this.handleClickClose(key)
    }

    handleClickOpen = (key: string) => {
        this.setState({'hidden': {...this.state.hidden, [key]: true}})
    }

    render() {
        return( 
            <PaddingPaper style={{width:"100%"}}>
                <Grid container spacing={2} direction='column'>  
                    <Grid item>
                        <Typography variant='h5'>
                            Личные данные
                        </Typography>    
                    </Grid>          
                    {
                    Object.keys(SETTINGS[this.props.role]).map(key => <>
                        <Grid container item direction="column">
                            <Typography style={{'color': '#808080'}}>
                                {SETTINGS.JOBSEEKER[key].title}
                            </Typography> 
                            <Grid item container direction='row' spacing={2} justify='space-between' style={{flexWrap:"nowrap"}}>                             
                                <Grid item>
                                    <Typography>
                                        {this.state.data[key]}
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
                            />
                        }
                    </>)
                } 
                </Grid>                                   
            </PaddingPaper>            
        )
    }
}


