import * as React from 'react';
import { Typography, Card, TextField, CardContent, Grid, Paper, Link, FormControl, Input, Button } from '@material-ui/core';
import { ChangeComponent } from '../cabinet/ChangeComponent';
import { SETTINGS } from '../cabinet/accountSettings';


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
            <Paper>
                <Typography variant='h5' style={{'paddingLeft': '30px', 'paddingTop': '30px', 'paddingRight': '30px'}}>
                    Личные данные
                </Typography>
                <Grid container direction='column' style={{'padding': '20px'}}>                
                {
                    Object.keys(SETTINGS[this.props.role]).map(key => <>
                        <Grid item container direction='row' style={{'padding': '7px'}}>
                            <Grid item> 
                                <Typography style={{'color': '#808080'}}>
                                    {SETTINGS.JOBSEEKER[key].title}
                                </Typography>
                            </Grid> 
                            <Grid item container direction='row' justify='space-between'>                             
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
            </Paper>            
        )
    }
}


