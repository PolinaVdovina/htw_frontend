import * as React from 'react';
import { HCenterizingGrid } from '../grid-containers/HCenterizingGrid';
import { PaddingPaper } from './../../components/cards/PaddingPaper';
import { useTheme, Grid, Typography, Paper, Divider } from '@material-ui/core';
import { Tape } from '../../components/tape/Tape';
import { INotificationData } from './../../redux/actions/notification-actions';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { notificationToPost, notificationsToPost } from '../../utils/tape-converters/notification-to-tape-element';
import { readNotificationsFetch, getNotificationsFetch } from '../../utils/fetchFunctions';

interface INotificationProps {
    notifications?: Array<INotificationData> | null,
    token?: string | null
}

const mapStateToProps = (state: RootState) => ({
    notifications: state.notificationReducer.notifications,
    token: state.authReducer.token,
})

const messageNotifications = () => {

}

const NotificationWrap = (props: INotificationProps) => {
    const theme = useTheme();
    const [notifications, setNotifications] = React.useState([]);

    const getNotifications = async() => {
        const fetch = await getNotificationsFetch(props.token);

        
        if(fetch.notifications) {
            setNotifications(fetch.notifications);
        }
    }

   
    React.useEffect(
        () => {
            if(props.token) {
                readNotificationsFetch(props.token);
                getNotifications();
            }    
        }, 
    [])
        
    return (
        <HCenterizingGrid >
            <Paper style={{ flexGrow: 1 }}>
                <Grid container direction="column" /*direction="row-reverse"*/ style={{ padding: theme.spacing(2) }}>
                    <Typography variant='h4'>Уведомления</Typography>
                </Grid>
                <Divider />
                <Tape
                    hideAvatars={true}
                    elements={notificationsToPost(notifications)}
                />
            </Paper>
        </HCenterizingGrid>
    )
}

export const Notification = connect(mapStateToProps)(NotificationWrap);