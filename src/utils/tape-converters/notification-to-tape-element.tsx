
import { INotificationData } from './../../redux/actions/notification-actions';
import { ITapeElementData } from '../../components/tape/posts/TapeElement';
import { ParagraphInPost } from './../../components/tape/posts/post-body-elements/ParagraphInPost';
import { timeParse, dateParse } from '../appliedFunc';
import { IBodyElement } from './../../components/tape/posts/TapeElement';


function textNotificationToPost(notificationData): ITapeElementData {
    const body = notificationData.description ? [
        {
            Component: ParagraphInPost,
            data: {
                description: notificationData.description,
                spacing: 0,
            }
        }
    ] : null;

    return {
        id: notificationData.id,
        title: notificationData.title,
        createdDate: notificationData.createdDate,
        rightNode: dateParse(notificationData.createdDate) + ", " + timeParse(notificationData.createdDate),
        body: body
    }
}

function chatNotificationToPost(notificationData): ITapeElementData {
    let body: IBodyElement[] | null = null;

    if (notificationData.chats) {
        let description = "";
        if (notificationData.chats.length == 1)
            description = `Пользователь ${notificationData.chats[0].name} оставил вам сообщени${notificationData.messageCount > 1 ? "я": "е"}`;
        else if(notificationData.chats.length < 10)
            description = `Пользователи${notificationData.chats.map( chat => " " + chat.name )} оставили вам сообщения`;
        else
            description = `У вас очень много непрочитанных чатов (${ notificationData.chats.length })`


        body = [
            {
                Component: ParagraphInPost,
                data: {
                    description: description,
                    spacing: 0,
                }
            }
        ]


    }

    return {
        id: notificationData.id,
        title: `У вас есть непрочитанные сообщения (${notificationData.messageCount})`,
        createdDate: notificationData.createdDate,
        rightNode: dateParse(notificationData.createdDate) + ", " + timeParse(notificationData.createdDate),
        body: body
    }
}


const notificationTypeParser = {
    TEXT: textNotificationToPost,
    CHAT_NOTIFICATION: chatNotificationToPost
}



export function notificationToPost(notificationData: INotificationData): ITapeElementData {

    return notificationTypeParser[notificationData.notificationType](notificationData);
    /*     return {
            createdDate: notificationData.createdDate
        } */
}

export function notificationsToPost(notificationDatas: Array<INotificationData>) {
    if (!notificationDatas)
        return null;
    return notificationDatas.map(notificationData => notificationToPost(notificationData));
}
