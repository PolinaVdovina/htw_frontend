
import { INotificationData } from './../../redux/actions/notification-actions';
import { ITapeElementData } from '../../components/tape/posts/TapeElement';
import { ParagraphInPost } from './../../components/tape/posts/post-body-elements/ParagraphInPost';
import { timeParse, dateParse } from '../appliedFunc';


function textNotificationToPost(notificationData): ITapeElementData {
    const body = notificationData.description ? [
            {
                Component: ParagraphInPost,
                data: {
                    description: notificationData.description,
                    spacing: 0,
                }
            }
        ]   : null;

    return {
        id: notificationData.id,
        title: notificationData.title,
        createdDate: notificationData.createdDate,
        rightNode:  dateParse(notificationData.createdDate) + ", " + timeParse(notificationData.createdDate),
        body: body
    }
}


const notificationTypeParser = {
    TEXT: textNotificationToPost,
} 



export function notificationToPost(notificationData): ITapeElementData {

    return notificationTypeParser[notificationData.notificationType](notificationData);
}

export function notificationsToPost(notificationDatas: Array<INotificationData>) {
    if(!notificationDatas)
        return null;
    return notificationDatas.map(notificationData => notificationToPost(notificationData));
}
