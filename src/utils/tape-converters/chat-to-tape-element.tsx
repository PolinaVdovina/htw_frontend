import { ITapeElementData } from "../../components/tape/posts/TapeElement";
import { Typography, Badge, useTheme } from "@material-ui/core";
import * as React from 'react';
import { usePrivateChatTracking as useChatTracking } from "../../websockets/chat/hooks";
import { IChatReceivingMessage, IReceivingChatData } from './../../websockets/chat/interfaces';
import { openChat } from './../../redux/reducers/chat-reducers';


function CircleCounter(props) {
    /*     const [counter, setCounter] = React.useState(props.count);
    
        useChatTracking(
            (message: IChatReceivingMessage) => {
                if (props.chatName == message.sender)
                    setCounter(counter => counter ? counter + 1 : 1);
    
            }
        ) */

    const theme = useTheme();
    return (<Badge overlap="circle"
        color="error"
        badgeContent={props.count}
        style={{ marginRight: theme.spacing(2), wordBreak: "initial" }} />)
}


export function chatToPost(chatData: IReceivingChatData, onClick: (chatId: number, viewName: string, chatName: string) => any): ITapeElementData {

    return {
        //createdDate: accountData.createdDate,
        id: chatData.id,
        title: chatData.name,
        ownerLogin: chatData.interlocutorLogin,
        rightNode: <CircleCounter chatName={chatData.name} count={chatData.unreadMessageCount} />,
        //bottomText: accountData.createdDate?.slice(0,10),
        onClick: () => { onClick(chatData.id, chatData.name, chatData.interlocutorLogin) },
    }
}

export function chatToPostList(chats: Array<IReceivingChatData> | null | undefined, onClick: (chatId: number, viewName: string, chatName: string) => any) {
    if (!chats)
        return [];
    return chats.map(chat => chatToPost(chat, onClick));
}