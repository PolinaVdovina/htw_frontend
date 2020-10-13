import * as React from 'react';
import { HCenterizingGrid } from '../grid-containers/HCenterizingGrid';
import { PaddingPaper } from './../../components/cards/PaddingPaper';
import { useTheme, Grid, Typography, Paper, Divider } from '@material-ui/core';
import { Tape } from '../../components/tape/Tape';
import { INotificationData, setNotificationWatchedDate, setNewNotificationCount } from './../../redux/actions/notification-actions';
import { RootState } from '../../redux/store';
import { connect, useDispatch } from 'react-redux';
import { notificationToPost, notificationsToPost } from '../../utils/tape-converters/notification-to-tape-element';
import { readNotificationsFetch, getNotificationsFetch } from '../../utils/fetchFunctions';
import { initNotifications } from '../../redux/reducers/notification-reducers';

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
    const dispatch = useDispatch();
    const readNotifications = async () => {
        await dispatch(setNewNotificationCount(0));
        /* const fetch = await getNotificationsFetch(props.token);
        if (fetch.notifications) {
            setNotifications(fetch.notifications);
        } */
        if(props.token) {
            const currentBackendDate = await readNotificationsFetch(props.token);
            await dispatch(setNotificationWatchedDate(currentBackendDate));
        }
    }

    React.useEffect( () => {
        
        readNotifications();

        //alert("hehe")
    }, [
        props.notifications && Math.max(...props.notifications.map(notification => Date.parse(notification.createdDate)))
    ]);

/*     React.useEffect(
        () => {
            const readNotify = async () => {
                if (props.token) {
                    const currentDate = await readNotificationsFetch(props.token);

                }
            }
            readNotify();
        }, [props.notifications]
    )
 */



    return (
        <HCenterizingGrid >
            <Paper style={{ flexGrow: 1 }}>
                <Grid container direction="column" /*direction="row-reverse"*/ style={{ padding: theme.spacing(2) }}>
                    <Typography variant='h4'>Уведомления</Typography>
                </Grid>
                <Divider />
                <Tape
                    hideAvatars={true}
                    elements={props.notifications ? notificationsToPost(props.notifications) : []}
                />
            </Paper>
        </HCenterizingGrid>
    )
}

export const Notification = connect(mapStateToProps)(NotificationWrap);