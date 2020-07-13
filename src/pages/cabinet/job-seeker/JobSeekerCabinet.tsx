import React from 'react'
import { Grid, Paper, List, ListItem } from '@material-ui/core'
import { JobSeekerFeedMenu } from './../../../components/feed-menu/job-seeker/JobSeekerFeedMenu';

interface IJobSeekerCabinet {

}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       textAlign: "center",
//       justifyContent: "center",
//       flex: 1,
//     },
//   }),
// );

export const JobSeekerCabinet = (props: IJobSeekerCabinet) => {
    return (
        <Grid container direction="row" spacing={2}>
            <Grid item>
                <List>
                    <ListItem button>
                        Моя страница
                    </ListItem>
                    <ListItem button>
                        Новости
                    </ListItem>
                    <ListItem button>
                        Сообщения
                    </ListItem>
                    <ListItem button>
                        Подписки
                    </ListItem>
                </List>
            </Grid>
            <Grid item style={{flexGrow:1}} >
                <Grid container style={{height:"100%", width: "100%"}} spacing={2}>
                    <Grid item style={{flexGrow:1}}>
                        <Paper style={{height:"100%"}}>
                            
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper style={{height:"100%"}}>
                            <JobSeekerFeedMenu/>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}