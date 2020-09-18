import { ITapeElementData } from "../../components/tape/posts/TapeElement";

export interface IChat {
    id?: number,
    name?: string,
}

export function chatToPost(chatData: IChat): ITapeElementData {
    return {
        //createdDate: accountData.createdDate,
        id: chatData.id,
        title: chatData.name,
        //ownerLogin: accountData.login,
        //bottomText: accountData.createdDate?.slice(0,10),
    }
}

export function chatToPostList(chats: Array<IChat>) {
    return chats.map(chat => chatToPost(chat));
}