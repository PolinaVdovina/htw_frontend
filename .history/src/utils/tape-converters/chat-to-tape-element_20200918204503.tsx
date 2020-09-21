import { ITapeElementData } from "../../components/tape/posts/TapeElement";

export interface IChat {
    id?: number,
    name?: string,
    interlocutorLogin: string
}

export function chatToPost(chatData: IChat): ITapeElementData {
    return {
        //createdDate: accountData.createdDate,
        id: chatData.id,
        title: chatData.name,
        ownerLogin: chatData.interlocutorLogin,
        //bottomText: accountData.createdDate?.slice(0,10),
        isChat: true
    }
}

export function chatToPostList(chats: Array<IChat>) {
    return chats.map(chat => chatToPost(chat));
}