import * as React from 'react';
import { Typography, Card, TextField, CardContent, Grid, Paper, Link, FormControl, Input, Button } from '@material-ui/core';


const SETTINGS = {
    JOBSEEKER: {
        'email': {
            'title': 'Электронная почта'           
        },
        'phone': {
            'title': 'Номер телефона'
        },
        'name': {
            'title': 'ФИО'
        },
        'address': {
            'title': 'Адрес'
        }
    }
}

interface IPropsAccountInfo{
    
}

interface IStateAccountInfo{
    data: {
        email: string,
        phone: string,
        name: string,
        address: string
    },
    hidden: {
        email: boolean,
        phone: boolean,
        name: boolean,
        address: boolean
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
                address: 'Россия, г Норильск, ул Молодежная, д 27, кв 62'
            },
            hidden: {
                email: false,
                phone: false,
                name: false,
                address: false
            }
        }
    }

    handleClickClose(key: string) {
        this.setState({'hidden': {...this.state.hidden, [key]: false}})
    }

    handleClickSave(key: string) {
        this.handleClickClose(key)
    }

    render() {
        return( 
            <Paper>
                <Typography variant='h5' style={{'paddingLeft': '30px', 'paddingTop': '30px', 'paddingRight': '30px'}}>Личные данные</Typography>
                <Grid container direction='column' style={{'padding': '20px'}}>                
                {
                    Object.keys(SETTINGS.JOBSEEKER).map(key => <>
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
                                        onClick={() => this.setState({'hidden': {...this.state.hidden, [key]: true}})}
                                    >
                                        Изменить
                                    </Link>
                                </Grid>
                            </Grid>                            
                        </Grid>
                        {this.state.hidden[key] &&
                            <Grid item container direction='column' justify='flex-start' style={{'padding': '7px'}}>
                                <Grid item container direction='row' alignItems='center'>
                                    <Grid item>
                                        <Typography>
                                            new
                                        </Typography>
                                    </Grid>
                                    <Grid item style={{'paddingLeft': '10px'}}>
                                        <TextField></TextField>
                                    </Grid>
                                </Grid>
                                <Grid item style={{'paddingTop': '10px'}}>
                                    <Button 
                                        variant="contained"
                                        color="primary" 
                                        style={{'margin': '5px'}}
                                        onClick={() => this.handleClickSave(key)}
                                    >
                                        Сохранить
                                    </Button>
                                    <Button 
                                        variant="contained"
                                        style={{'margin': '5px'}}
                                        onClick={() => this.handleClickClose(key)}
                                    >
                                        Отменить
                                    </Button>
                                </Grid>
                            </Grid>




                        }
                    </>)
                } 
                </Grid>                                   
            </Paper>            
        )
    }
}


{/*<ChangeComponent
handleClickClose={this.handleClickClose}
handleClickSave={this.handleClickSave}
key={key}
/>*/}