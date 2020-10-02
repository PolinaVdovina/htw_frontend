
import { INotificationData } from './../../redux/actions/notification-actions';
import { ITapeElementData } from '../../components/tape/posts/TapeElement';
import { ParagraphInPost } from './../../components/tape/posts/post-body-elements/ParagraphInPost';

export function notificationToPost(notificationData: INotificationData): ITapeElementData {
    return {
        id: notificationData.id,
        ownerLogin: notificationData.sender,
        title: notificationData.title,
        body: [
            {
                Component: ParagraphInPost,
                data: {
                    description: notificationData.message,
                    spacing: 0,
                }
            }
        ]
    }
}

export function notificationsToPost(notificationDatas: Array<INotificationData>) {
    return notificationDatas.map(notificationData => notificationToPost(notificationData));
}
