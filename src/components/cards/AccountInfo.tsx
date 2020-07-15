import * as React from 'react';
import { Typography, Card, TextField, CardContent, Grid, Paper, Link } from '@material-ui/core';


const SETTINGS = {
    JOBSEEKER: {
        'email': {
            'title': 'Электронная почта',
            'type': 'text'
        },
        'phone': {
            'title': 'Номер телефона',
            'type': 'text'
        }
    }
}

interface IAccountInfo{
    
}

export default class AccountInfo extends React.Component {
    constructor(props: IAccountInfo) {
        super(props)
    }

    render() {
        return( 
            <Paper>
                <Typography variant='h5'>Личные данные</Typography>
                    <Grid container direction='column'>
                        {
                            Object.keys(SETTINGS.JOBSEEKER).map(key => 
                                <Grid container direction='row'>
                                    <Grid item>
                                        <Typography>
                                            {SETTINGS.JOBSEEKER[key].title}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <TextField/>
                                    </Grid>
                                    <Grid item>
                                        <Link component='button'>
                                            Изменить
                                        </Link>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Grid>                    
                
            </Paper>            
        )
    }
}